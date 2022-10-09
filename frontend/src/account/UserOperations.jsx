import * as React from 'react';
import {useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useRecoilState} from "recoil";
import {accessTokenAtom, userOperationsAtom} from "../state";
import {getUserOperations} from "../actions";


export default function UserOperations() {
    const [accessToken] = useRecoilState(accessTokenAtom)
    const [userOperations] = useRecoilState(userOperationsAtom)

    useEffect(() => {
        if (accessToken !== null) {
            getUserOperations()
        }
    }, [accessToken])

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>USD</TableCell>
                        <TableCell>Details</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {userOperations.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                            <TableCell component="th" scope="row">{row.date}</TableCell>
                            <TableCell>{(row.usdCost / 100).toFixed(2)}$</TableCell>
                            <TableCell>
                                <p>User txn:<br/>
                                    {row.userTxHash}</p>
                                <p>Sponsor txn:<br/>
                                    {row.sponsorTxHash}</p>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}