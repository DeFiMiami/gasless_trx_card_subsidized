import {useEffect} from 'react';
import {useRecoilState} from "recoil";
import {accessTokenAtom, userBalanceAtom} from "../state";
import {getProfile} from "../actions";

export default function UserBalance() {
    const [accessToken] = useRecoilState(accessTokenAtom);
    const [userBalance] = useRecoilState(userBalanceAtom);

    useEffect(() => {
        if (accessToken !== null) {
            getProfile()
        }
    }, [accessToken])

    return (
        <div>
            User balance <div>{userBalance}</div>
        </div>
    )
}