import {useEffect} from 'react';
import {useRecoilState} from "recoil";
import {accessTokenAtom, userBalanceAtom} from "../state";
import {addFunds, signin} from "../actions";
import Button from "@mui/material/Button";

export default function AddFunds() {
    const [accessToken] = useRecoilState(accessTokenAtom);

    return (
        <div>
            <Button variant="contained" onClick={addFunds}>Add Funds</Button>
        </div>
    )
}