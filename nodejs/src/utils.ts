import {BigNumber} from "ethers";
import axios, {AxiosResponse} from "axios";
import {Response} from "express";

export async function getMaxBaseFeeInFutureBlock(provider, blocksInFuture: number): Promise<BigNumber> {
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

export async function forwardRequestToProvider<P, ResBody, ReqBody, ReqQuery, Locals>(providerUrl: string, req) {
    console.log('PROVIDER request: ', JSON.stringify(req.body));
    let providerResponse = await axios.post(providerUrl, req.body, {
            headers: {'Content-Type': 'application/json'}
        }
    );
    console.log('PROVIDER response: ', JSON.stringify(providerResponse.data));
    return providerResponse;
}

export function resSend<ResBody, Locals>(res: Response<ResBody, Locals>, data) {
    console.log('Response: ', JSON.stringify(data));
    res.send(data);
}