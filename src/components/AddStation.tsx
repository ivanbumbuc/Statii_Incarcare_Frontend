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

function AddStation() {
    const [userInfo, setUserInfo] = useState(
        {
            id: null,
            name: "test",
            password: "12345",
            is_admin: "true",
            is_charging: "false"
        }
    );
    const [plugList, setPlugs] = useState([
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
    ]);

    const [open, setOpen] = React.useState(false);
    const [openAdd, setOpenAdd] = React.useState(false);
    const [targetPlug, setTargetPlug] = React.useState( 0 );
    const [dialogPlugName, setPlugName] = React.useState("");
    const [dialogPlugPower, setPlugPower] = React.useState(0);
    const [dialogPlugPrice, setPlugPrice] = React.useState(0);


    const handleName = (event: any) => {
        setPlugName(event.target.value)
    };
    const handlePower = (event: any) => {
        setPlugPower(event.target.value)
    };
    const handlePrice = (event: any) => {
        setPlugPrice(event.target.value)
    };
    const handleClickOpen = (event: any) => {
        setTargetPlug(event.target.id-1);
        setPlugName(plugList[targetPlug].name);
        setPlugPrice(plugList[targetPlug].price);
        setPlugPower(plugList[targetPlug].power);
        console.log(event.target.id);
        setOpen(true);
    };
    const handleClickOpenAdd = (event: any) => {
        console.log(event.target.id);
        setOpenAdd(true);
        // setTargetPlug(event.target.id-1);
    };

    const handleJustClose = (event: any) => {
        setOpen(false);
    }
    const handleClose = (event: any) => {
        setOpen(false);
        const newList = [...plugList];
        newList[targetPlug].name = dialogPlugName;
        newList[targetPlug].price = dialogPlugPrice;
        newList[targetPlug].power = dialogPlugPower;
        console.log(targetPlug);
        console.log(newList[targetPlug].name);
        setPlugName("");
        setPlugPrice(0);
        setPlugPower(0);

        setPlugs(newList);
    };
    const handleDelete = (event: any) => {
        const newList = plugList.filter((i, itemIndex) => event.target.value-1 != itemIndex);
        //console.log(newList);
        setPlugs(newList);
    }
    const handleJustCloseAdd = (event: any) => {
        setOpenAdd(false);
    };
    const handleCloseAdd = (event: any) => {
        setOpenAdd(false);
        var tempElem= {
            id : plugList.length+1,
            name : dialogPlugName,
            price : dialogPlugPrice,
            power : dialogPlugPower
        };
        setPlugName("");
        setPlugPrice(0);
        setPlugPower(0);
        const newList = [...plugList,tempElem];
        console.log(newList);
        setPlugs(newList);
    }

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(4);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    return (
        <div>
            <AppBarResponsive/>
                <CssBaseline/>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Edit</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Change the type, amount of power and price for the plug you're editing!
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Plug Type"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleName}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="power"
                            label="Power (kW)"
                            type="number"
                            fullWidth
                            variant="standard"
                            onChange={handlePower}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="price"
                            label="Price (RON/ORA)"
                            type="number"
                            fullWidth
                            variant="standard"
                            onChange={handlePrice}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button color="error" onClick={handleJustClose}>Cancel</Button>
                        <Button color="success" onClick={handleClose}>Save</Button>
                    </DialogActions>
                </Dialog>
            <Dialog open={openAdd} onClose={handleCloseAdd}>
                <DialogTitle>Add</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Write the type, the amount of power and price for the new plug!
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Plug Type"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleName}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="power"
                        label="Power (kW)"
                        type="number"
                        fullWidth
                        variant="standard"
                        onChange={handlePower}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="price"
                        label="Price (RON/ORA)"
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
                            Add Station
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
                                <TextField
                                    variant="filled"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Station Name"
                                    name="name"
                                    autoComplete="station-name"
                                    autoFocus
                                    sx={{ backgroundColor: "white" }}
                                    //onChange={(e)=>setEmail(e.currentTarget.value)}
                                />
                                <TextField
                                    variant="filled"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="city"
                                    name="city"
                                    label="City"
                                    autoComplete="city"
                                    sx={{ backgroundColor: "white" }}
                                />
                                <TextField
                                    variant="filled"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="address"
                                    label="Address"
                                    name="address"
                                    autoComplete="address"
                                    sx={{ backgroundColor: "white" }}
                                    //onChange={(e)=>setEmail(e.currentTarget.value)}
                                />
                                <TextField
                                    variant="filled"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="coordX"
                                    label="X Coordinate"
                                    name="coordX"
                                    autoComplete="coordX"
                                    sx={{ backgroundColor: "white" }}
                                    //onChange={(e)=>setEmail(e.currentTarget.value)}
                                />
                                <TextField
                                    variant="filled"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="coordY"
                                    label="Y Coordinate"
                                    name="coordY"
                                    autoComplete="coordY"
                                    sx={{ backgroundColor: "white" }}
                                    //onChange={(e)=>setEmail(e.currentTarget.value)}
                                />
                                <Paper sx={{mt: 3.9, overflow: 'hidden'}}>
                                    <TableContainer sx={{maxHeight: 270}} component={Paper}>
                                        <Table aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Plug Type</TableCell>
                                                    <TableCell>Power</TableCell>
                                                    <TableCell>Price</TableCell>
                                                    <TableCell align="center">Actions</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {plugList
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
                                                                {row.power}
                                                            </TableCell>
                                                            <TableCell>
                                                                {row.price}
                                                            </TableCell>
                                                            <TableCell align="center">
                                                                <Button id={row.id.toString()} onClick={handleClickOpen}
                                                                        color="success">Edit</Button>
                                                                <Button value={row.id.toString()} onClick={handleDelete} color="error">Delete</Button>
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
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                    />
                                </Paper>
                                <Button onClick={handleClickOpenAdd}
                                        color="success">Add Plug</Button>

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2, backgroundColor: "#79d279" }}
                                >
                                    Add Station
                                </Button>
                                <Typography align="center"></Typography>
                            </Box>

                        </Box>
                    </Paper>
                </Paper>
        </div>
    );
}

export default AddStation;