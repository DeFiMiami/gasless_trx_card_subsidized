import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
    date: number,
    usdCost: number,
    sponsorTxHash: string,
    sponsorTxSerialized: string,
    userTxHash: string,
    userTxSerialized: string,
) {
    return {
        date: new Date(date).toLocaleTimeString(),
        usdCost: usdCost / 100, sponsorTxHash,
        sponsorTxSerialized, userTxHash, userTxSerialized
    }
}

const rows = [
    createData(1665280714,
        150,
        "0x36e4939e27fcb10f6c1d2f35c9e4298f1f66391bcff058f9dfcba89471499d15",
        "{\"type\":2,\"chainId\":5,\"nonce\":106,\"maxPriorityFeePerGas\":{\"type\":\"BigNumber\",\"hex\":\"0x012a05f200\"},\"maxFeePerGas\":{\"type\":\"BigNumber\",\"hex\":\"0x012a05f227\"},\"gasPrice\":null,\"gasLimit\":{\"type\":\"BigNumber\",\"hex\":\"0x5208\"},\"to\":\"0x993b4B533aF149b5249fD6e7506157980db222a2\",\"value\":{\"type\":\"BigNumber\",\"hex\":\"0x5af3107a4000\"},\"data\":\"0x\",\"accessList\":[],\"hash\":\"0x36e4939e27fcb10f6c1d2f35c9e4298f1f66391bcff058f9dfcba89471499d15\",\"v\":0,\"r\":\"0x4d84086b1e8033119d538827fefa6350420b0146d63383a9927f44109b2106d9\",\"s\":\"0x06b52d6a4052aa7e0b4203bd8c57b8af3bbb3d6d96c7855962f5dfe6b8480839\",\"from\":\"0x29Ff2e635634A3C36932CAeB45b1a8E9cCDB24B2\",\"confirmations\":0}",
        "0xdbc8c97fc348f72f370cec0e181b69adea65120af39059342d953b0e522c96af",
        "{\"type\":2,\"chainId\":5,\"nonce\":21,\"maxPriorityFeePerGas\":{\"type\":\"BigNumber\",\"hex\":\"0x59682f00\"},\"maxFeePerGas\":{\"type\":\"BigNumber\",\"hex\":\"0x59682f34\"},\"gasPrice\":null,\"gasLimit\":{\"type\":\"BigNumber\",\"hex\":\"0x5d68\"},\"to\":\"0x19C14A453e54601e824f48da40FBa60312f42cb3\",\"value\":{\"type\":\"BigNumber\",\"hex\":\"0x00\"},\"data\":\"0x6057361d0000000000000000000000000000000000000000000000000000000000000003\",\"accessList\":[],\"hash\":\"0xdbc8c97fc348f72f370cec0e181b69adea65120af39059342d953b0e522c96af\",\"v\":0,\"r\":\"0x49f43e91d5e7f21aba7a3bfea8fc3f9864f804e3eb15d0731bc4436a637a2310\",\"s\":\"0x6b6c107ce20e8e914dac472fd170029213eaa974cb2d903c27590e7122c623f5\",\"from\":\"0x993b4B533aF149b5249fD6e7506157980db222a2\",\"confirmations\":0}"),
    createData(1665280714,
        50,
        "0x36e4939e27fcb10f6c1d2f35c9e4298f1f66391bcff058f9dfcba89471499d15",
        "{\"type\":2,\"chainId\":5,\"nonce\":106,\"maxPriorityFeePerGas\":{\"type\":\"BigNumber\",\"hex\":\"0x012a05f200\"},\"maxFeePerGas\":{\"type\":\"BigNumber\",\"hex\":\"0x012a05f227\"},\"gasPrice\":null,\"gasLimit\":{\"type\":\"BigNumber\",\"hex\":\"0x5208\"},\"to\":\"0x993b4B533aF149b5249fD6e7506157980db222a2\",\"value\":{\"type\":\"BigNumber\",\"hex\":\"0x5af3107a4000\"},\"data\":\"0x\",\"accessList\":[],\"hash\":\"0x36e4939e27fcb10f6c1d2f35c9e4298f1f66391bcff058f9dfcba89471499d15\",\"v\":0,\"r\":\"0x4d84086b1e8033119d538827fefa6350420b0146d63383a9927f44109b2106d9\",\"s\":\"0x06b52d6a4052aa7e0b4203bd8c57b8af3bbb3d6d96c7855962f5dfe6b8480839\",\"from\":\"0x29Ff2e635634A3C36932CAeB45b1a8E9cCDB24B2\",\"confirmations\":0}",
        "0xdbc8c97fc348f72f370cec0e181b69adea65120af39059342d953b0e522c96af",
        "{\"type\":2,\"chainId\":5,\"nonce\":21,\"maxPriorityFeePerGas\":{\"type\":\"BigNumber\",\"hex\":\"0x59682f00\"},\"maxFeePerGas\":{\"type\":\"BigNumber\",\"hex\":\"0x59682f34\"},\"gasPrice\":null,\"gasLimit\":{\"type\":\"BigNumber\",\"hex\":\"0x5d68\"},\"to\":\"0x19C14A453e54601e824f48da40FBa60312f42cb3\",\"value\":{\"type\":\"BigNumber\",\"hex\":\"0x00\"},\"data\":\"0x6057361d0000000000000000000000000000000000000000000000000000000000000003\",\"accessList\":[],\"hash\":\"0xdbc8c97fc348f72f370cec0e181b69adea65120af39059342d953b0e522c96af\",\"v\":0,\"r\":\"0x49f43e91d5e7f21aba7a3bfea8fc3f9864f804e3eb15d0731bc4436a637a2310\",\"s\":\"0x6b6c107ce20e8e914dac472fd170029213eaa974cb2d903c27590e7122c623f5\",\"from\":\"0x993b4B533aF149b5249fD6e7506157980db222a2\",\"confirmations\":0}"),
]

export default function UserOperations() {
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
                    {rows.map((row) => (
                        <TableRow
                            key={row.date}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                            <TableCell component="th" scope="row">{row.date}</TableCell>
                            <TableCell>{row.usdCost.toFixed(2)}$</TableCell>
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