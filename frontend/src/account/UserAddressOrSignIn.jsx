import { useRecoilState } from "recoil";
import { userAddressAtom } from "../state";
import {signin, signout} from "../actions";
import Button from "@mui/material/Button";

export default function UserAddressOrSignIn() {
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
                <Button variant="contained" onClick={signin}>Sign In</Button>
            </div>
        )
    }
}