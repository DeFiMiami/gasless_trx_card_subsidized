import { useRecoilState } from "recoil";
import { userAddressAtom } from "../state";
import {signin, signout} from "../actions";
import Button from "@mui/material/Button";
import Profile from "./Profile";
import UserOperations from "./UserOperations";
import AddFunds from "./AddFunds";
import Deposits from "./Deposits";

export default function UserAddressOrSignIn() {
    const [userAddress] = useRecoilState(userAddressAtom);

    if (userAddress) {
        return (
            <div>
                <Profile/>
                <UserOperations/>
                <AddFunds/>
                <Deposits/>
                <div>
                Signed in as {userAddress}</div>
                <span>
                    <Button variant="contained" onClick={signout}>Sign out</Button>
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