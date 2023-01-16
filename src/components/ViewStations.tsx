import * as React from "react";
import {useEffect, useState} from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {css} from "@emotion/react";
import {FormControl, InputLabel, Select, SelectChangeEvent, TablePagination} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AppBarResponsive from "./AppBarResponsive";
import {addPlugTypeNew, getAllPlugsType} from "../api/plugsType";
import MenuItem from "@mui/material/MenuItem";
import {addPlugToStationAdmin, deleteStationAdmin, getPlugsAdmin, getStationsAdmin} from "../api/admin";
import {useSelector} from "react-redux";
import {ApplicationState} from "../reducers/type";
import TextField from "@mui/material/TextField";
import {addPlugToStation} from "../api";


const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  box-sizing: border-box;
`;

interface IStatie {
    id: string;
    name: string;
    city: string;
    address: string;
    plugs: string;
    latitude: number;
    longitude: Number;
}

function ViewStations() {
    const [userInfo, setUserInfo] = useState(
        {
            id: 'dad623e82db2ud82dj',
            name: "test",
            password: "12345",
            is_admin: "true",
            is_charging: "false"
        }
    );
    const [stationList, setStations] = useState([
        {
            id: 'chewywe627e237e237e82',
            name: "cv",
            city: "Timisoara",
            address: "",
            latitude: 45.75554707085215,
            longitude: 21.22867584228516,
        },
        ]
    );
    const [plugList, setPlugs] = useState([
        {
            id:"",
            name: "test",
            power: 55,
            price: 200,
        },
    ])

    const [plugTypes, setPlugTypes] = useState([
        {
            id:1,
            name: "test",
            power: 55,
        },
        {
            id:2,
            name: "test2",
            power: 55,
        },
    ]);


    const [open, setOpen] = React.useState(false);
    const [targetStation, setTargetStation] = React.useState( 0 );
    const [openAdd, setOpenAdd] = React.useState(false);

    const handleClickOpen = (id:string) => {
       // setTargetStation(event.target.id-1);
        getPlugsAdmin(id).then((result) => {
            setPlugs(result.data);
        }).catch((err) => {
            console.log(err);
        });
        setOpen(true);
    };
    const handleClose = (event: any) => {
        setOpen(false);
    };
    const handleDelete = (id:string) => {
        // const newList = plugList.filter((i, itemIndex) => event.target.value-1 != itemIndex);
        // //console.log(newList);
        // setPlugs(newList);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        const newList = stationList.filter((st) => { st?.id != id});
        deleteStationAdmin(id).catch((err) => {console.log(err)});
        setStations(newList);
    }

    const [page, setPage] = React.useState(0);
    const [pagePlug, setPagePlug] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(4);
    const [rowsPerPagePlug, setRowsPerPagePlug] = React.useState(5);
    const [price,setPrice] = React.useState(0);
    const [idStation, setIdStation] = useState('');
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

    const handleCloseAdd = (event: any) => {
        addPlugToStationAdmin(idStation, type, price).catch((err) => {
            console.log(err);
        });
        setOpenAdd(false);
        setType('');
    }

    const handlePrice = (event: any) => {
        setPrice(event.currentTarget.value);
    }

    const handleJustCloseAdd = (event: any) => {
        setOpenAdd(false);
        setType('');
    };

    const handleOpenAddPlug = (id: string) => {
        setOpenAdd(true);
        setIdStation(id);
        getAllPlugsType().then((result) => {
            setPlugTypes(result.data);
        }).catch((err) => {
            console.log(err);
        })
    }

    const [type,setType] = useState<string>('');

    const handleChangeTypeOfPlug = (event: SelectChangeEvent) => {
        setType(event.target.value as string);
    };

    const userStates = useSelector<ApplicationState>(state => state.startReducer.userReducer) as UserState;

    useEffect(() => {
        getStationsAdmin(userStates.user.id).then((result) => {
            setStations(result.data);
        }).catch((err) => {
            console.log(err);
        });
    },[stationList,userStates.user.id]);

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

            <Dialog open={openAdd} onClose={handleCloseAdd}>
                <DialogTitle>Add</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Select the type and power, and write the price for the new plug!
                    </DialogContentText>

                    <FormControl style={{width:300,marginTop:20 ,marginBottom:20}}>
                        <InputLabel id="demo-simple-select-label">Type of plugs</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={type}
                            label="Type"
                            onChange={handleChangeTypeOfPlug}
                        >
                            {plugTypes?.map((st) => {
                                return (
                                    <MenuItem value={st.id}>Type: {st.name}, Power: {st.power}</MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>

                    <TextField
                        style={{width:300}}
                        autoFocus
                        margin="dense"
                        id="price"
                        label="Price (eur)"
                        type="number"
                        fullWidth
                        variant="standard"
                        onChange={handlePrice}
                    />
                </DialogContent>
                <DialogActions>
                    <Button color="error" onClick={handleJustCloseAdd}>Cancel</Button>
                    <Button color="success" onClick={handleCloseAdd}>Add</Button>
                </DialogActions>
            </Dialog>
            <Paper sx={{
                background: "linear-gradient(#79d279 35%, #5F9F5F 65%, #3A5F3A 95%);",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flexWrap: "wrap",
                height:'100vh'
            }} >
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
                                                            {row.latitude}
                                                        </TableCell>
                                                        <TableCell>
                                                            {row.longitude}
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <Button id={row.id.toString()} onClick={() => {handleOpenAddPlug(row.id)}}
                                                                    color="secondary">Add Plug</Button>
                                                            <Button id={row.id.toString()} onClick={() => {handleClickOpen(row.id)}}
                                                                    color="success">Plugs</Button>
                                                            <Button value={row.id.toString()} onClick={() => {handleDelete(row.id)}} color="error">Delete</Button>
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
