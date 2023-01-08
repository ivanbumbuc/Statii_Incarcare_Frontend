import * as React from "react";
import {useState} from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {css} from "@emotion/react";
import {TablePagination} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonIcon from '@mui/icons-material/Person';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AppBarResponsive from "./AppBarResponsive";


const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  box-sizing: border-box;
`;

function ViewStations() {
    const [userInfo, setUserInfo] = useState(
        {
            id: null,
            name: "test",
            password: "12345",
            is_admin: "true",
            is_charging: "false"
        }
    );
    const [stationList, setStations] = useState([
        {
            id: 1,
            name: "Station 1",
            city: "Timisoara",
            address: "FC Ripensia",
            coordX: 5,
            coordY: 3,
            plugs: [
                {
                    id:1,
                    name: "test",
                    power: 55,
                    price: 200,
                },
                {
                    id:2,
                    name: "test2",
                    power: 55,
                    price: 200,
                },
                {
                    id:3,
                    name: "test3",
                    power: 55,
                    price: 200,
                },
                {
                    id:4,
                    name: "test4",
                    power: 55,
                    price: 5325,
                },
            ]
        },
        ]
    );
    const [plugList, setPlugs] = useState([
        {
            id:1,
            name: "test",
            power: 55,
            price: 200,
        },
    ])

    const [open, setOpen] = React.useState(false);
    const [targetStation, setTargetStation] = React.useState( 0 );


    const handleClickOpen = (event: any) => {
        setTargetStation(event.target.id-1);
        setPlugs(stationList[targetStation].plugs);
        setOpen(true);
    };
    const handleClose = (event: any) => {
        setOpen(false);
    };
    const handleDelete = (event: any) => {
        // const newList = plugList.filter((i, itemIndex) => event.target.value-1 != itemIndex);
        // //console.log(newList);
        // setPlugs(newList);
    }

    const [page, setPage] = React.useState(0);
    const [pagePlug, setPagePlug] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(4);
    const [rowsPerPagePlug, setRowsPerPagePlug] = React.useState(5);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    const handleChangePagePlug = (event: unknown, newPage: number) => {
        setPagePlug(newPage);
    };
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleChangeRowsPerPagePlug = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <div>
            <AppBarResponsive/>
            <CssBaseline/>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Plugs</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Change the type, amount of power and price for the plug you're editing!
                    </DialogContentText>
                    <Paper sx={{mt: 3.9, overflow: 'hidden'}}>
                        <TableContainer sx={{maxHeight: 270}} component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Plug Type</TableCell>
                                        <TableCell>Power</TableCell>
                                        <TableCell>Price</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {plugList
                                        .slice(pagePlug * rowsPerPagePlug, pagePlug * rowsPerPagePlug + rowsPerPagePlug)
                                        .map((row) => (
                                            <TableRow
                                                key={row.id}
                                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {row.name}
                                                </TableCell>
                                                <TableCell>
                                                    {row.power}
                                                </TableCell>
                                                <TableCell>
                                                    {row.price}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[3]}
                            component="div"
                            count={plugList.length}
                            rowsPerPage={rowsPerPagePlug}
                            page={pagePlug}
                            onPageChange={handleChangePagePlug}
                            onRowsPerPageChange={handleChangeRowsPerPagePlug}
                        />
                    </Paper>
                </DialogContent>
                <DialogActions>
                    <Button color="success" onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
            <Paper sx={{
                background: "linear-gradient(#79d279 35%, #5F9F5F 65%, #3A5F3A 95%);",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flexWrap: "wrap",
            }}>
                <Paper
                    sx={{
                        my: 20,
                        mx: 10,
                        bgcolor: "#FCFCFC",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        flexWrap: "wrap",
                        mt: 10,
                        padding: 2.5,
                    }}

                >
                    <Avatar sx={{mb: 1, bgcolor: "#79d279"}}>
                        <AccountCircleIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        View Stations
                    </Typography>
                    <Box
                        component="div"
                        sx={{
                            bgcolor: "#FCFCFC",
                            display: 'flex',
                            flexDirection: 'row',
                            alignContent: 'center',
                            justifyContent: 'space-evenly',
                            padding: 2.5,
                        }}
                    >
                        <Box
                            component="form"
                            // onSubmit={addStation}
                            sx={{ mt: 1 }}
                        >
                            <Paper sx={{mt: 3.9, overflow: 'hidden'}}>
                                <TableContainer sx={{maxHeight: 270}} component={Paper}>
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Station Name</TableCell>
                                                <TableCell>City</TableCell>
                                                <TableCell>Address</TableCell>
                                                <TableCell>Coord X</TableCell>
                                                <TableCell>Coord Y</TableCell>
                                                <TableCell align="center">Actions</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {stationList
                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                .map((row) => (
                                                    <TableRow
                                                        key={row.id}
                                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                                    >
                                                        <TableCell component="th" scope="row">
                                                            {row.name}
                                                        </TableCell>
                                                        <TableCell>
                                                            {row.city}
                                                        </TableCell>
                                                        <TableCell>
                                                            {row.address}
                                                        </TableCell>
                                                        <TableCell>
                                                            {row.coordX}
                                                        </TableCell>
                                                        <TableCell>
                                                            {row.coordY}
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <Button id={row.id.toString()} onClick={handleClickOpen}
                                                                    color="success">Plugs</Button>
                                                            <Button value={row.id.toString()} onClick={handleDelete} color="error">Delete</Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <TablePagination
                                    rowsPerPageOptions={[5]}
                                    component="div"
                                    count={stationList.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </Paper>
                            <Typography align="center"></Typography>
                        </Box>

                    </Box>
                </Paper>
            </Paper>
        </div>
    );
}

export default ViewStations;