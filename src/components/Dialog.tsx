import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import {FormControl, InputLabel, PaperProps, Select, SelectChangeEvent} from "@mui/material";
import {getPlugsStation} from "../api/plugs";
import {useEffect, useState} from "react";
import MenuItem from "@mui/material/MenuItem";

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
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const { handleOpenDialog,handleClaimDialog, open, paperProps,claimHide,statieId } = props;

  const [plugId, setPlugId] = useState('');


  const handleChange = (event: SelectChangeEvent) => {
    setPlugId(event.target.value as string);
  };

  const createBooking = () => {

  }

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={() => handleOpenDialog()}
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
        <DialogActions>{
          !claimHide &&
          <Button autoFocus sx={{m:2}} onClick={() => {handleClaimDialog(); createBooking(); }}>
            Claim
          </Button >}
          <div style={{ width: "50%" }}></div>
          <Button autoFocus sx={{mr:2}} onClick={() => handleOpenDialog()}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
