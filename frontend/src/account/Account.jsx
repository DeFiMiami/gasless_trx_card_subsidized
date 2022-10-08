import { useRecoilState } from "recoil";
import { userAddressAtom } from "../state";
import {signin, signout} from "../actions";

export default function Account() {
    const [userAddress] = useRecoilState(userAddressAtom);

    if (userAddress) {
        return (
            <div>
                Signed in as {userAddress}
                <span>
                    <button onClick={signout}>Sign out</button>
                </span>
            </div>
        )
    } else {
        return (
            <div>
                <button onClick={signin}>Sign In</button>
            </div>
        )
    }
}