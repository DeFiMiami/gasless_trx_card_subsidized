import {BigNumber, Transaction} from "ethers";
import {Response} from "express";
import {JsonRpcProvider} from "@ethersproject/providers/lib/json-rpc-provider";

export async function subsidizeWithStrategy1(provider: JsonRpcProvider, userTransaction: Transaction, baseGasFee: BigNumber) {
    // let userBalance = provider.getBalance(userTransaction.from)
    if (await canRunWithoutSubsidizing(provider, userTransaction)) {
        return BigNumber.from(1e9).mul(100_000) // leave 100k GWEI for now to force sponsored transaction every time
    } else {
        let userTransactionGasPrice = baseGasFee?.add(userTransaction.maxPriorityFeePerGas!)
        return BigNumber.from(500_000).mul(userTransactionGasPrice)
    }
}

export async function canRunWithoutSubsidizing(provider: JsonRpcProvider, userTransaction: Transaction) {
    try {
        // TODO use eth_call instead
        await provider.estimateGas(userTransaction)
        return true
    } catch (e) {
        return false
    }
}

export function resSend<ResBody, Locals>(res: Response<ResBody, Locals>, data) {
    console.log('Response: ', JSON.stringify(data));
    res.send(data);
}