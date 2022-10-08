import { useRecoilState } from "recoil";
import { userAddressAtom } from "./state";
import {signin, signout} from "./Auth";

export default function CurrentUser() {
    const [userAddress, setUserAddress] = useRecoilState(userAddressAtom);

    //const currentAddress = localStorage.getItem('currentAddress')
    console.log('userAddress', userAddress, '!')
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