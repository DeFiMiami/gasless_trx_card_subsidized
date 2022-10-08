import express from 'express';
import axios from "axios";
import {BigNumber, ethers} from "ethers";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req, res) => {
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

    console.log('Request: ', JSON.stringify(req.body));

    if (req.body.method == 'eth_getBalance') {
        let firstAddress = (req.body)['params'][0].toLowerCase();
        res.send({'jsonrpc': '2.0', 'id': req.body.id, 'result': '0x6a6328983ab81a00000'});
        return
    }
    if (req.body.method == 'eth_call' &&
        METAMASK_BALANCE_CHECK_CONTRACTS.includes(req.body.params[0].to.toLowerCase())) {

        const encodedParams = ethers.utils.hexDataSlice(req.body.params[0].data, 4)
        const decodedParams = ethers.utils.defaultAbiCoder.decode(['address[]', 'address[]'], encodedParams);
        const walletAddresses: string[] = decodedParams[0]

        const alchemyResponse = await forwardRequestToProvider(providerUrl, req);
        // const decodedAlchemyResult = ethers.utils.defaultAbiCoder.decode(['address[]'], alchemyResponse.data.result);
        console.log('BEFORE: ', JSON.stringify(alchemyResponse.data));

        const newBalances = Array(walletAddresses.length).fill(BigNumber.from(1).mul(ETH))
        alchemyResponse.data.result = ethers.utils.defaultAbiCoder.encode(['uint256[]'], [newBalances]);
        console.log('AFTER: ', JSON.stringify(alchemyResponse.data));
        res.send(alchemyResponse.data);
        return
    }

    let providerResponse = await forwardRequestToProvider(providerUrl, req);
    res.send(providerResponse.data);
})

async function forwardRequestToProvider<P, ResBody, ReqBody, ReqQuery, Locals>(providerUrl: string, req) {
    console.log('Provider request: ', JSON.stringify(req.body));
    let providerResponse = await axios.post(providerUrl, req.body, {
            headers: {'Content-Type': 'application/json'}
        }
    );
    console.log('Provider response: ', JSON.stringify(providerResponse.data));
    return providerResponse;
}

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});