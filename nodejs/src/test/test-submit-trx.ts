import * as dotenv from "dotenv";
import {TransactionRequest} from "@ethersproject/abstract-provider";

const {ethers} = require("ethers");

dotenv.config();

async function main() {
    let url = "http://localhost:3000/entrypoint/5";
    // const provider = new ethers.providers.JsonRpcProvider(url);
    const provider = new ethers.providers.JsonRpcProvider("https://defimiami-gogas.herokuapp.com/entrypoint/5");

    let wallet = new ethers.Wallet(process.env.USER_PRIVATE_KEY!)
    wallet = wallet.connect(provider)
    console.log("Connected to", url)

    let trx: TransactionRequest = {
        "to": "0x19c14a453e54601e824f48da40fba60312f42cb3",
        "data": "0x6057361d0000000000000000000000000000000000000000000000000000000000000003"
    };
    console.log("Sending trx")
    let transactionResponse = await wallet.sendTransaction(trx);
    console.log(transactionResponse)
    console.log("Sent trx, waiting for mint")
    await provider.waitForTransaction(transactionResponse.hash)
    console.log("Successfully minted")
}

main()