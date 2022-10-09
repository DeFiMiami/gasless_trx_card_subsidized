import {useRecoilState} from "recoil";
import {accessTokenAtom, userAddressAtom, userBalanceAtom} from "../state";
import {getUserBalance, signin} from "../actions";
import Button from "@mui/material/Button";
import UserOperations from "./UserOperations";
import Deposits from "./Deposits";
import {Grid} from "@mui/material";
import AddFunds from "./AddFunds";
import {useEffect} from "react";

function UserBalance() {

    const [accessToken] = useRecoilState(accessTokenAtom);
    const [userBalance] = useRecoilState(userBalanceAtom);

    useEffect(() => {
        if (accessToken !== null) {
            getUserBalance()
        }
    }, [accessToken])

    return (
        <div>
            <div className="card text-right">
                <div className="card-body">
                    <h3 className="card-title">User balance: {userBalance / 100}$</h3>
                    <h6 className="card-title">ETH virtual balance: {(userBalance / 100 / 1500).toFixed(4)} ETH</h6>
                    <h6 className="card-title">Poligon virtual balance: {(userBalance / 100 / 0.8).toFixed(1)} MATIC</h6>
                    <AddFunds/>
                </div>
            </div>
        </div>
    )
}
export default function MainPageOrSignIn() {
    const [userAddress] = useRecoilState(userAddressAtom);

    if (userAddress) {
        return (
            <div>
                <Grid container spacing={2} paddingBottom={5} paddingTop={2} justifyContent="flex-end">
                    <Grid item xs={5}>
                        <UserBalance/>
                    </Grid>
                </Grid>
                <Grid container spacing={2} paddingTop={0}>
                    <Grid item xs={7} paddingTop={0}>
                        <UserOperations/>
                    </Grid>
                    <Grid item xs={5}>
                        <Deposits/>
                    </Grid>
                </Grid>
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