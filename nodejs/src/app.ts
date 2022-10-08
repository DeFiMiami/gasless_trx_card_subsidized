import express from 'express';
import axios from "axios";
import {ethers} from "ethers";
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

app.post('/proxy/:chainId', async (req, res) => {
    var providerUrl = PROVIDERS[req.params.chainId]
    const provider = new ethers.providers.JsonRpcProvider(providerUrl)

    console.log('Request: ', JSON.stringify(req.body));

    if (req.body.method == 'eth_getBalance') {
        let firstAddress = (req.body)['params'][0].toLowerCase();
        res.send({'jsonrpc': '2.0', 'id': req.body.id, 'result': '0x6a6328983ab81a00000'});
        return
    }

    let providerResponse = await forwardRequestToProvider(providerUrl, req);
    res.send(providerResponse.data);
})

async function forwardRequestToProvider<P, ResBody, ReqBody, ReqQuery, Locals>(providerUrl: string, req) {
    let alchemyResponse = await axios.post(providerUrl, req.body, {
            headers: {'Content-Type': 'application/json'}
        }
    );
    console.log('Provider response: ', JSON.stringify(alchemyResponse.data));
    return alchemyResponse;
}

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});