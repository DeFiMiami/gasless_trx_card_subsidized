import express from 'express';
import {BigNumber, ethers} from "ethers";
import * as dotenv from "dotenv";
import {TransactionRequest} from "@ethersproject/abstract-provider";
import {forwardRequestToProvider, getMaxBaseFeeInFutureBlock, resSend} from "./utils";
import {subsidizeWithStrategy1} from "./sponsor-strategy";
import moment from 'moment'
import jwt from 'jsonwebtoken'
import {recoverTypedSignature_v4} from 'eth-sig-util'
import 'reflect-metadata'
import {AppDataSource} from './data-source'
import {User} from "./entity/User"

require('console-stamp')(console);

dotenv.config();

const jwtPrivateKey = 'PrivateKey'
const getCurrentTimestampUnix = (): number => moment.utc().unix()
const app = express();
const port = process.env.PORT == null ? 3000 : process.env.PORT;
app.use(express.json());
app.use(express.urlencoded());

AppDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});

app.get('/test', (req, res) => {
    res.send('Hello World!');
});

const PROVIDERS = {
    1: process.env.ETHEREUM_RPC_URL,
    5: process.env.GOERLI_RPC_URL
}

const ETH = BigNumber.from(1e9).mul(1e9); // 10^18
const GWEI = BigNumber.from(1e9); // 10^9


// https://github.com/MetaMask/metamask-filecoin-developer-beta/blob/4ec4bf9995e64bfb0eb732cbe10ae2f2bac2ddff/app/scripts/constants/contracts.js
const METAMASK_BALANCE_CHECK_CONTRACTS = [
    '0xb1f8e55c7f64d203c1400b9d8555d050f94adf39',
    '0x9f510b19f1ad66f0dcf6e45559fab0d6752c1db7',
    '0xb8e671734ce5c8d7dfbbea5574fa4cf39f7a54a4',
    '0xb1d3fbb2f83aecd196f474c16ca5d9cffa0d0ffc',
    '0x9788c4e93f9002a7ad8e72633b11e8d1ecd51f9b'];


app.post('/proxy/:chainId', async (req, res) => {
    var providerUrl = PROVIDERS[req.params.chainId]
    const provider = new ethers.providers.JsonRpcProvider(providerUrl)

    let sponsorWallet = new ethers.Wallet(process.env.OUR_PRIVATE_KEY!)
    sponsorWallet = sponsorWallet.connect(provider)

    console.log('Request: ', JSON.stringify(req.body));

    if (req.body.method == 'eth_getBalance') {
        let firstAddress = (req.body)['params'][0].toLowerCase();
        resSend(res, {'jsonrpc': '2.0', 'id': req.body.id, 'result': '0x6a6328983ab81a00000'});
        return
    }
    if (req.body.method == 'eth_call' &&
        METAMASK_BALANCE_CHECK_CONTRACTS.includes(req.body.params[0].to.toLowerCase())) {

        const encodedParams = ethers.utils.hexDataSlice(req.body.params[0].data, 4)
        const decodedParams = ethers.utils.defaultAbiCoder.decode(['address[]', 'address[]'], encodedParams);
        const walletAddresses: string[] = decodedParams[0]

        const providerResponse = await forwardRequestToProvider(providerUrl, req);
        // const decodedAlchemyResult = ethers.utils.defaultAbiCoder.decode(['address[]'], alchemyResponse.data.result);

        const newBalances = Array(walletAddresses.length).fill(BigNumber.from(1).mul(ETH))
        providerResponse.data.result = ethers.utils.defaultAbiCoder.encode(['uint256[]'], [newBalances]);
        resSend(res, providerResponse.data);
        return
    }
    if (req.body.method == 'eth_sendRawTransaction') {
        const PRIORITY_GAS_PRICE = GWEI.mul(5); // miner bribe

        let estimatedBaseGasFee = await getMaxBaseFeeInFutureBlock(provider, 3)

        let userSignedTransaction = req.body.params[0];
        let userParsedTransaction = await ethers.utils.parseTransaction(userSignedTransaction);
        resSend(res, {'jsonrpc': '2.0', 'id': req.body.id, 'result': userParsedTransaction.hash});

        let valueToSubsidize = await subsidizeWithStrategy1(provider, userParsedTransaction, estimatedBaseGasFee)

        if (valueToSubsidize > 0) {
            let sponsorTransaction: TransactionRequest = await sponsorWallet.populateTransaction({
                to: userParsedTransaction.from,
                value: valueToSubsidize,
                type: 2,
                gasLimit: 21000,
                maxPriorityFeePerGas: PRIORITY_GAS_PRICE,
                maxFeePerGas: estimatedBaseGasFee.add(PRIORITY_GAS_PRICE)
            });
            let sponsorSignedTransaction = await sponsorWallet.signTransaction(sponsorTransaction);

            let sponsorTx = await provider.sendTransaction(sponsorSignedTransaction)
            console.log("Sent sponsor transaction", sponsorTx.hash);
            await sponsorTx.wait()
            console.log("Sponsor transaction minted", sponsorTx.hash);
        }

        console.log("Sending user transaction", userParsedTransaction.hash);
        try {
            let userTx = await provider.sendTransaction(userSignedTransaction)
            console.log("Sent user transaction", userTx.hash);
            await userTx.wait()
            console.log("User transaction minted", userTx.hash);
        } catch (e) {
            console.log("User transaction failed", userParsedTransaction.hash, e);
        }
        return
    }

    let providerResponse = await forwardRequestToProvider(providerUrl, req);
    resSend(res, providerResponse.data)
})

app.get('/', (req, res) => {
    res.json({ message: "v1" });
});

app.get('/api', (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.post('/stripe-webhook', async function (req, res) {
    console.log(req.body)
})

app.post('/signin', async function (req, res) {
    let userAddress = recoverTypedSignature_v4({
        data: JSON.parse(req.body.msgParams),
        sig: req.body.sig,
      });
    console.log('userAddress=', userAddress)
    let user = await AppDataSource.getRepository(User)
        .findOne({where: {address: userAddress}})
    if (user === null) {
        user = await AppDataSource.getRepository(User).create({
            createdAt: getCurrentTimestampUnix(),
            address: userAddress
        })
        user = await AppDataSource.getRepository(User).save(user)
    }
    var accessToken = jwt.sign({ userAddress }, jwtPrivateKey);
    return res.json({accessToken, userAddress})
})

function getUserAddressFromRequest(req) {
    const token = req.headers['authorization'] && req.headers['authorization'].toString().split(' ')[1]
    console.log('token', token)
    if (token === null) {
        return null
    }
    try {
        const decoded: any = jwt.verify(token, jwtPrivateKey)
        console.log('decoded', decoded)
        return decoded.userAddress
    } catch (err) {
        console.log('err', err)
        return null
    }
}

app.get('/profile', async function (req, res) {
    console.log('profile')
    // const users = await AppDataSource.getRepository(User)
    //     .createQueryBuilder('user')
    //     .orderBy('user.id')
    //     .getMany()
    // users.forEach((user) => {
    //     console.log(user)
    // })
    const userAddress = getUserAddressFromRequest(req)
    if (userAddress === null) {
        return res.status(401).send('Not authorized')
    }
    const user = await AppDataSource.getRepository(User)
        .findOne({where: {address: userAddress}})
    console.log('userAddress', userAddress)
    const balance = 0
    return res.json({balance})
})
