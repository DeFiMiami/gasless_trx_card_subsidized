import {useEffect} from 'react';
import {useRecoilState} from "recoil";
import {accessTokenAtom, userDepositsAtom} from "../state";
import {getDeposits} from "../actions";

export default function Deposits() {
    const [accessToken] = useRecoilState(accessTokenAtom)
    const [userDeposits] = useRecoilState(userDepositsAtom)
    useEffect(() => {
        if (accessToken !== null) {
            getDeposits()
        }
    }, [accessToken])

    if (userDeposits === null) {
        return <div>Here will be user deposits</div>
    }
    const depositList = []
    userDeposits.forEach(item => {
            depositList.push(<div>{item.d}</div>)
        }
    )
    return (
        <div>
            {depositList}
        </div>
    )
}