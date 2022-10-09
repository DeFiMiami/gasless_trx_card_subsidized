import {useEffect} from 'react';
import {useRecoilState} from "recoil";
import {accessTokenAtom, userBalanceAtom} from "../state";
import {getUserBalance} from "../actions";

export default function UserBalance() {
    const [accessToken] = useRecoilState(accessTokenAtom);
    const [userBalance] = useRecoilState(userBalanceAtom);

    useEffect(() => {
        if (accessToken !== null) {
            getUserBalance()
        }
    }, [accessToken])

    return (
        <div>
            My balance <div>{(userBalance/100).toFixed(2)}$</div>
        </div>
    )
}