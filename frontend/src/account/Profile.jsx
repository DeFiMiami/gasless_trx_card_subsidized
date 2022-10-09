import {useEffect} from 'react';
import {useRecoilState} from "recoil";
import {accessTokenAtom, userBalanceAtom} from "../state";
import {signin, signout, getProfile} from "../actions";

export default function Profile() {
    const [accessToken] = useRecoilState(accessTokenAtom);
    const [userBalance] = useRecoilState(userBalanceAtom);

    useEffect(() => {
        getProfile()
    }, [])

    if (accessToken) {
        return (
            <div>
                User balance <div>{userBalance}</div>
            </div>
        )
    } else {
        return (
            <div>
                Please Sign In
            </div>
        )
    }
}