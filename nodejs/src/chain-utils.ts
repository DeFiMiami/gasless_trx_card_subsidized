import {BigNumber} from "ethers";
import axios, {AxiosResponse} from "axios";
import {Response} from "express";
import {JsonRpcProvider} from "@ethersproject/providers/lib/json-rpc-provider";

export async function getMaxBaseFeeInFutureBlock(provider: JsonRpcProvider, blocksInFuture: number): Promise<BigNumber> {
    let mintedBlock = await provider.getBlock("latest")
    let currentBaseGasFee = mintedBlock.baseFeePerGas!;
    return getMaxBaseFeeInFuture2(currentBaseGasFee, blocksInFuture)
}

// Copied from Flashbots
export function getMaxBaseFeeInFuture2(baseFee: BigNumber, blocksInFuture: number): BigNumber {
    let maxBaseFee = BigNumber.from(baseFee)
    for (let i = 0; i < blocksInFuture; i++) {
        maxBaseFee = maxBaseFee.mul(1125).div(1000).add(1)
    }
    return maxBaseFee
}
