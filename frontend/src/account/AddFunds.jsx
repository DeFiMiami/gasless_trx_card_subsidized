import {useEffect} from 'react';
import {useRecoilState} from "recoil";
import {accessTokenAtom, userBalanceAtom} from "../state";
import {addFunds} from "../actions";

export default function AddFunds() {
    const [accessToken] = useRecoilState(accessTokenAtom);

    return (
        <div>
            <button onClick={addFunds}>Add Funds</button>
        </div>
        // <form action="/create-checkout-session" method="POST">
        //     <button type="submit" id="checkout-button">Add Fund</button>
        //   </form>
    )
}