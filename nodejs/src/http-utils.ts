import axios from "axios";
import {Response} from "express";

export async function forwardRequestToProvider<P, ResBody, ReqBody, ReqQuery, Locals>(providerUrl: string, req) {
    // console.log('PROVIDER request: ', JSON.stringify(req.body));
    let providerResponse = await axios.post(providerUrl, req.body, {
            headers: {'Content-Type': 'application/json'}
        }
    );
    // console.log('PROVIDER response: ', JSON.stringify(providerResponse.data));
    return providerResponse;
}

export function resSend<ResBody, Locals>(res: Response<ResBody, Locals>, data) {
    console.log('Response: ', JSON.stringify(data));
    res.send(data);
}