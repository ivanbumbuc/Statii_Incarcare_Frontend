import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { PaperProps } from "@mui/material";

type DialogProps = {
  open: boolean,
  handleOpenDialog: Function,
  handleClaimDialog: Function,
  paperProps?: Partial<PaperProps>,
  children: React.ReactNode,
  claimHide:boolean,
}

export default function ResponsiveDialog(props: DialogProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const { handleOpenDialog,handleClaimDialog, open, paperProps,claimHide } = props;
  
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
        <DialogActions>{
          !claimHide &&
          <Button autoFocus sx={{m:2}} onClick={() =>handleClaimDialog()}>
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
