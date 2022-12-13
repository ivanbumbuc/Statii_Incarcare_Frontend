import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { css } from "@emotion/react";
import {Checkbox, Chip, InputLabel, Link, TablePagination} from '@mui/material';
import {getCookie} from "typescript-cookie";
import {useState} from "react";
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


const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  box-sizing: border-box;
`;

function MyAccount(){
    const [userInfo, setUserInfo] = useState(
        {
            id: null,
            name: "test@gmail.com",
            password: "12345",
            is_admin: "false",
            is_charging: "false"
        }
        );
    const [carList, setCars] = useState([
        {
            id: undefined,
            user_id: 1,
            car_plate: "TM 55 ARG",
        },
        {
            id: undefined,
            user_id: 1,
            car_plate: "TM 63 AIE",
        },
        {
            id: undefined,
            user_id: 1,
            car_plate: "TM 64 BOB",
        },
    ]);
    const [bookingList, setBookings] = useState([
        {
            id: null,
            start_time:"06-06-2008 15:00:00",
            end_time: "06-06-2008 17:00:00",
            plug_id:null,
            user_id:1,
        },
        {
            id: null,
            start_time:"05-08-2018 15:00:00",
            end_time: "06-08-2018 15:00:00",
            plug_id:null,
            user_id:1,
        },
        {
            id: null,
            start_time:"05-08-2017 15:00:00",
            end_time: "06-08-2017 15:00:00",
            plug_id:null,
            user_id:1,
        },
        {
            id: null,
            start_time:"05-08-2021 15:00:00",
            end_time: "06-08-2021 15:00:00",
            plug_id:null,
            user_id:1,
        },
        {
            id: null,
            start_time:"05-08-2022 15:00:00",
            end_time: "06-08-2022 15:00:00",
            plug_id:null,
            user_id:1,
        },
    ]);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = (event: any) => {
        console.log(event.target.id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(4);

    const [pageCar, setPageCar] = React.useState(0);
    const [rowsPerPageCar, setRowsPerPageCar] = React.useState(3);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleChangePageCar = (event: unknown, newPage: number) => {
        setPageCar(newPage);
    };

    const handleChangeRowsPerPageCar = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPageCar(+event.target.value);
        setPageCar(0);
    };


    return(
        <Grid
            container
            justifyContent="center"
            component="main"
            sx={{
                height: "100vh",
                background: "linear-gradient(rgba(149,36,169,1) 35%, rgba(100,25,113,1) 65%, rgba(63,18,82,1) 95%);",
            }}
        >
            <CssBaseline />
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Write your new car plate and don't forget to click save to successfully change your car info!
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="car_plate"
                        label="Car Plate"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button color="error" onClick={handleClose}>Cancel</Button>
                    <Button color="secondary" onClick={handleClose}>Save</Button>
                </DialogActions>
            </Dialog>
            <Grid
                item
                xs={12}
                sm={6}
                md={8}
                component={Paper}
                elevation={6}
                square
                sx={{
                    marginTop:{xs:0,md:"30px"},
                    minHeight:"600px",
                    height: {md:"90vh",xs:"100vh"},
                    borderRadius: "16px",
                    backgroundImage: "#FCFCFC",
                    //backgroundImage: "linear-gradient(#b5fff2, #75efa4)",
                }}
            >
                <Box
                    sx={{
                        my: 20,
                        mx: 10,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        flexWrap: "wrap",
                        mt: 5,
                    }}
                >
                    <Avatar sx={{ mb:1, bgcolor: "#9c27b0" }}>
                        <AccountCircleIcon/>
                    </Avatar>
                    <Typography sx={{ display:{xs:"inline",md:"inline"}}} component="h1" variant="h5">
                        My Account
                    </Typography>
                    <Grid container mt={5} sx={{ flexDirection:{md:'row',xs:"column"} }}
                    >
                        <Grid item sx={{flexDirection:"column"}} xs={12} md={4} justifyContent="flex-start" overflow="autonpm">
                            <Grid item xs={12} md={12}>
                                <Typography>
                                    <PersonIcon sx={{ verticalAlign:"bottom"}} />
                                    {userInfo.name}
                                </Typography>
                            {/*<Chip*/}
                            {/*    sx={{mt:2}}*/}
                            {/*    icon={<PersonIcon/>}*/}
                            {/*    label={userInfo.name}*/}
                            {/*    variant="outlined"*/}
                            {/*/>*/}
                            </Grid>
                            <Grid item xs={12} md={12}>
                            <Chip
                                icon={<AdminPanelSettingsIcon/>}
                                label={userInfo.is_admin=="true" ? "Admin" : "User"}
                                variant="outlined"
                            />
                            <Chip
                                icon={<BatteryChargingFullIcon/>}
                                label={userInfo.is_charging=="true" ? "Charging" : "Not Charging"}
                                variant="outlined"
                            />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Paper sx={{ mt:1, overflow: 'hidden' }}>
                                    <TableContainer sx={{ overflowY:"auto",
                                        maxHeight: {md:'36vh',xs:'20vh'} }} component={Paper}>
                                        <Table sx={{
                                            border: 2,
                                            borderColor: 'secondary.main'
                                        }} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Car Plate</TableCell>
                                                    <TableCell align="center">Actions</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {carList
                                                    .slice(pageCar * rowsPerPageCar, pageCar * rowsPerPageCar + rowsPerPageCar)
                                                    .map((row) => (
                                                        <TableRow
                                                            key={row.car_plate}
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                        >
                                                            <TableCell component="th" scope="row">
                                                                {row.car_plate}
                                                            </TableCell>
                                                            <TableCell align="center">
                                                                <Button id={row.id} onClick={handleClickOpen} color="secondary">Edit</Button>
                                                                <Button color="error">Delete</Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <TablePagination
                                        rowsPerPageOptions={[3]}
                                        component="div"
                                        count={carList.length}
                                        rowsPerPage={rowsPerPageCar}
                                        page={pageCar}
                                        onPageChange={handleChangePageCar}
                                        onRowsPerPageChange={handleChangeRowsPerPageCar}
                                    />
                                </Paper>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={8} sx={{
                            mt: {xs:0, md:5},
                            ml: {xs:0, md:0}
                        }}>
                            <Typography sx={{ }}>Booking history</Typography>
                        <Paper sx={{mt:0, overflow: 'hidden' }}>
                        <TableContainer sx={{
                            maxHeight: {xs:'30vh',md:'50vh'}}
                        } component={Paper}>

                            <Table sx={{
                                border: 2,
                                color: 'secondary.main'
                                //backgroundImage: "linear-gradient(#b5fff2, #75efa4)"
                            }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Start Time</TableCell>
                                        <TableCell>End Time</TableCell>
                                        <TableCell>Selected Plug</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {bookingList
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => (
                                        <TableRow
                                            key={row.start_time}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.start_time}
                                            </TableCell>
                                            <TableCell>
                                                {row.end_time}
                                            </TableCell>
                                            <TableCell>
                                                {row.plug_id}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[4]}
                            component="div"
                            count={bookingList.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                        </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>

        </Grid>
    );
}

export default MyAccount;