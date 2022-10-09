import * as dotenv from "dotenv";
import {TransactionRequest} from "@ethersproject/abstract-provider";

const {ethers} = require("ethers");

dotenv.config();

async function main() {
    const provider = new ethers.providers.JsonRpcProvider("http://localhost:3000/proxy/5");
    let wallet = new ethers.Wallet(process.env.USER_PRIVATE_KEY!)
    wallet = wallet.connect(provider)

    let trx: TransactionRequest = {
        "to": "0x19c14a453e54601e824f48da40fba60312f42cb3",
        "data": "0x6057361d0000000000000000000000000000000000000000000000000000000000000003"
    };
    let transactionResponse = await wallet.sendTransaction(trx);
    console.log(transactionResponse)
}

main()