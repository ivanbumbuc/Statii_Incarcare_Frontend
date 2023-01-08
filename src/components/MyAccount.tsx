import * as React from "react";
import {useEffect, useState} from "react";
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
import {
    deleteAccountCarsInformation,
    editAccountCarsInformation,
    getAccountBookingInformation,
    getAccountCarsInformation,
    getAccountUserInformation
} from "../api/account";
import {useSelector} from "react-redux";
import {ApplicationState} from "../reducers/type";
import {getAccountCars} from "../api";


const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  box-sizing: border-box;
`;
interface Profile {
    name:string;
    admin:string;
    charging:string;
}

interface Booking{
    start_time: string;
    end_time: string;
    plug_type: string;
}

interface Car {
    car_id: string;
    car_plate: string;
}
function MyAccount() {

    const userStates = useSelector<ApplicationState>(state => state.startReducer.userReducer) as UserState;
    const [userInfo, setUserInfo] = useState<Profile>(

    );
    const [carList, setCars] = useState([

    ]as Car[]);

    const [bookingList, setBookings] = useState([

    ] as Booking[]);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(4);

    const [pageCar, setPageCar] = React.useState(0);
    const [rowsPerPageCar, setRowsPerPageCar] = React.useState(3);
    const [carPlate,setCarPlate] = React.useState<string>('');
    const [carId, setCarId] = React.useState('');
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


    useEffect(() => {
        getAccountUserInformation(userStates?.user?.id).then((result) => {
            setUserInfo(result.data);
        }).catch((err) => {
           console.log(err);
        });
    },[userInfo,userStates.user.id]);

    useEffect(() => {
        getAccountBookingInformation(userStates?.user?.id).then((result) => {
            setBookings(result.data);
        }).catch((err) => {
           console.log(err);
        });
    },[bookingList,userStates.user.id]);

    useEffect(() => {
        getAccountCarsInformation(userStates?.user?.id).then((result) => {
            setCars(result.data);
        }).catch((err) => {
            console.log(err);
        });
    },[carList,userStates.user.id]);

    const handleSaveCar = () => {
        editAccountCarsInformation(carId,carPlate).then(() => {}).catch((err) => {
            console.log(err);
        })
        handleClose();
    }

    const deleteCarTable = (id:string) => {
        deleteAccountCarsInformation(id).catch((err) => {
            console.log(err);
        });
    }

    return (
        <div>
            <AppBarResponsive/>
            <Grid
                container
                justifyContent="center"
                component="main"
                sx={{
                    height: "100vh",
                    background: "linear-gradient(rgba(149,36,169,1) 35%, rgba(100,25,113,1) 65%, rgba(63,18,82,1) 95%);",
                }}
            >
                <CssBaseline/>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Edit</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Write your new car plate and don't forget to click save to successfully change your car
                            info!
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="car_plate"
                            label="Car Plate"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={carPlate}
                            onChange={(val) => setCarPlate(val.target.value as string)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button color="error" onClick={handleClose}>Cancel</Button>
                        <Button color="secondary" onClick={handleSaveCar}>Save</Button>
                    </DialogActions>
                </Dialog>
                <Grid
                    item
                    xs={12}
                    sm={8}
                    //md={5}
                    component={Paper}
                    elevation={6}
                    square
                    sx={{
                        marginTop: "30px",
                        minHeight: "600px",
                        height: "90vh",
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
                            mt: 10,
                        }}
                    >
                        <Avatar sx={{mb: 1, bgcolor: "#9c27b0"}}>
                            <AccountCircleIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            My Account
                        </Typography>
                        <Box
                            component="div"
                            sx={{ //mt:1,
                                display: 'flex',
                                flexDirection: 'row',
                                alignContent: 'center',
                                justifyContent: 'space-evenly',
                            }}
                        >
                            <Grid container direction="column" flexGrow={0} justifyContent="flex-start" overflow="auto">
                                <Grid container mt={5} direction="row" alignItems="center" justifyContent="flex-start">
                                    <Grid item>
                                        <PersonIcon/>
                                    </Grid>
                                    <Grid item sx={{textAlign: 'right'}} xs={4}>
                                        Username:
                                    </Grid>
                                    <Grid item marginLeft={1}>
                                        {userInfo?.name}
                                    </Grid>

                                </Grid>
                                <Grid container direction="row" alignItems="center" justifyContent="flex-start">
                                    <Grid item>
                                        <AdminPanelSettingsIcon/>
                                    </Grid>
                                    <Grid item sx={{textAlign: 'right'}} xs={4}>
                                        Is admin:
                                    </Grid>
                                    <Grid item marginLeft={1}>
                                        {userInfo?.admin == "true" ? <CheckCircleIcon color="success"/> :
                                            <CancelIcon color="error"/>}
                                    </Grid>
                                </Grid>
                                <Grid container direction="row" alignItems="center" justifyContent="flex-start">
                                    <Grid item>
                                        <BatteryChargingFullIcon/>
                                    </Grid>
                                    <Grid item sx={{textAlign: 'right'}} xs={4}>
                                        Is charging:
                                    </Grid>
                                    <Grid item marginLeft={1}>
                                        {userInfo?.charging == "true" ? <CheckCircleIcon color="success"/> :
                                            <CancelIcon color="error"/>}
                                    </Grid>
                                </Grid>
                                <Paper sx={{mt: 3.9, overflow: 'hidden'}}>
                                    <TableContainer sx={{maxHeight: 270}} component={Paper}>
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
                                                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                                        >
                                                            <TableCell component="th" scope="row">
                                                                {row.car_plate}
                                                            </TableCell>
                                                            <TableCell align="center">
                                                                <Button id={row.car_id} onClick={() => { setCarId(row.car_id as string);handleClickOpen();}}
                                                                        color="secondary">Edit</Button>
                                                                <Button color="error" onClick={() => {deleteCarTable(row.car_id as string);}}>Delete</Button>
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
                            <Grid container direction="column" overflow="auto">
                                <Paper sx={{ml: 5, mt: 5, overflow: 'hidden'}}>
                                    <TableContainer sx={{
                                        mt: 1,
                                        mb: 1,
                                    }} component={Paper}>
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
                                                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                                        >
                                                            <TableCell component="th" scope="row">
                                                                {row.start_time}
                                                            </TableCell>
                                                            <TableCell>
                                                                {row.end_time}
                                                            </TableCell>
                                                            <TableCell>
                                                                {row.plug_type}
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
                            <Typography align="center"></Typography>
                        </Box>
                    </Box>
                </Grid>

            </Grid>
        </div>
    );
}

export default MyAccount;
