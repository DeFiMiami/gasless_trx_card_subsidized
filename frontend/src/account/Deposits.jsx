import * as React from 'react';
import {useEffect} from 'react';
import {useRecoilState} from "recoil";
import {accessTokenAtom, userDepositsAtom} from "../state";
import {getDeposits} from "../actions";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";

function createData(
    date: number,
    amount: number,
) {
    return {
        date: new Date(date).toLocaleTimeString(),
        amount: amount / 100
    }
}

const userDeposits = [
    createData(1665280714,
        150),
    createData(2665280714,
        50),
]

export default function Deposits() {
    // const [accessToken] = useRecoilState(accessTokenAtom)
    // const [userDeposits] = useRecoilState(userDepositsAtom)

    // useEffect(() => {
    //     if (accessToken !== null) {
    //         getDeposits()
    //     }
    // }, [accessToken])

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>USD</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {userDeposits.map((row) => (
                        <TableRow
                            key={row.date}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                            <TableCell component="th" scope="row">{row.date}</TableCell>
                            <TableCell>{row.amount.toFixed(2)}$</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}