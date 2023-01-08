import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import {FormControl, InputLabel, PaperProps, Select, SelectChangeEvent} from "@mui/material";
import {getEndingHours, getPlugsStation, getStartingHours} from "../api/plugs";
import {useEffect, useState} from "react";
import MenuItem from "@mui/material/MenuItem";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import {useSelector} from "react-redux";
import {ApplicationState} from "../reducers/type";
import {addBooking} from "../api";
import {addBookingPlug} from "../api/booking";

interface Plugs{
  id: string;
  name: string;
}

type DialogProps = {
  open: boolean,
  handleOpenDialog: Function,
  handleClaimDialog: Function,
  paperProps?: Partial<PaperProps>,
  children: React.ReactNode,
  claimHide:boolean,
  statieId: string,
  plugsStation: Plugs[]
}


export default function ResponsiveDialog(props: DialogProps) {

  const userStates = useSelector<ApplicationState>(state => state.startReducer.userReducer) as UserState;


  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const { handleOpenDialog,handleClaimDialog, open, paperProps,claimHide,statieId } = props;

  const [plugId, setPlugId] = useState('');
  const [startHour, setStartHour] = useState('');
  const [endHour, setEndHour] = useState('');

  const [startHoursArray, setStartHoursArray] = useState([] as string[]);
  const [endHoursArray,setEndHoursArray] = useState([] as string[]);

  const [start,setStart] = useState<boolean>(false);
  const [end,setEnd] = useState<boolean>(false);
  console.log(props.plugsStation);
  const handleChange = (event: SelectChangeEvent) => {
    setPlugId(event.target.value as string);
    setEnd(false);
    setStart(false);
    setStartHoursArray([] as string[]);

    getStartingHours(event.target.value as string).then((result) => {
      setStartHoursArray(result.data);
      setStart(true);
    }).catch((err) => {
      console.log(err);
    });
  };

  const handleChangeStart = (event: SelectChangeEvent) => {
    setStartHour(event.target.value as string);
    setEnd(false);
    setEndHoursArray([] as string[]);
    getEndingHours(event.target.value as string, plugId).then((response) => {
      setEndHoursArray(response.data);
      setEnd(true);
    }).catch((err) => {
      console.log(err);
    })
  };

  const handleChangeEnd = (event: SelectChangeEvent) => {
    setEndHour(event.target.value as string);
  };

  const createBooking = () => {

    addBookingPlug(userStates.user.id, plugId, startHour, endHour).then(() => {
        handleClickOpen();
    }).catch((err) => {
      handleClickOpen3();
    })
  }

  const deleteV = () => {
    setStartHour('');
    setEndHour('');
    setEndHoursArray([]);
    setStartHoursArray([]);
    setStart(false);
    setEnd(false);
  }
  const [open2, setOpen2] = React.useState(false);

  const handleClickOpen = () => {
    setOpen2(true);
  };

  const handleClose = () => {
    setOpen2(false);
    deleteV();
  };

  const [open3, setOpen3] = React.useState(false);

  const handleClickOpen3 = () => {
    setOpen3(true);
    deleteV();
  };

  const handleClose3 = () => {
    setOpen3(false);
  };

  return (
    <div>

      <Dialog
          open={open3}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Error"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography>
              <b>User has already booked a charging station plug!!</b>
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose3} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
          open={open2}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Reservation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography>
              <b>The reservation was made between {startHour} and {endHour} hours!!</b>
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={() => {handleOpenDialog(); setStart(false)}}
        aria-labelledby="responsive-dialog-title"
        PaperProps={paperProps}
      >
        <DialogContent style={{ minWidth: 298,overflow: "hidden"  }} sx={{}}>
          <DialogContentText>
            <div>{props.children}</div>
          </DialogContentText>
        </DialogContent>
        <FormControl style={{width:250, marginLeft:40}}>
          <InputLabel id="demo-simple-select-label">Plugs</InputLabel>
          <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={plugId}
              label="Plugs"
              onChange={handleChange}
          >
            {props.plugsStation?.map((st) => {
              return (
                  <MenuItem value={st.id}>{st.name}</MenuItem>
              );
            })}
          </Select>
        </FormControl>
        {start &&
            <FormControl style={{width:250, marginLeft:40, marginTop:20}}>
              <InputLabel id="demo-simple-select-label">Start Hour</InputLabel>
              <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={startHour}
                  label="Start"
                  onChange={handleChangeStart}
              >
                {startHoursArray?.map((st) => {
                  return (
                      <MenuItem value={st}>{st}</MenuItem>
                  );
                })}
              </Select>
            </FormControl>
        }

        {end &&
            <FormControl style={{width:250, marginLeft:40, marginTop:20}}>
              <InputLabel id="demo-simple-select-label">End Hour</InputLabel>
              <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={endHour}
                  label="End"
                  onChange={handleChangeEnd}
              >
                {endHoursArray?.map((st) => {
                  return (
                      <MenuItem value={st}>{st}</MenuItem>
                  );
                })}
              </Select>
            </FormControl>
        }
        <DialogActions>{
          !claimHide &&
          <Button autoFocus sx={{m:2}} onClick={() => {handleClaimDialog(); createBooking(); }}>
            Claim
          </Button >}
          <div style={{ width: "50%" }}></div>
          <Button autoFocus sx={{mr:2}} onClick={() => {deleteV();handleOpenDialog();}}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
