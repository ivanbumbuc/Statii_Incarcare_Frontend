import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {Button, CardActionArea, CardActions, TableCell, TableRow} from "@mui/material";
import imgSt from "../assets/imgSt.jpg";

type StationCardProps = {
    StatieName: string;
    handleOpenDialog?: Function;
    statieId: string;
    isNotLight?: boolean;
    city: string;
    address: string;
    plugs: string;
};

function StatieCard({
                        StatieName,
                        handleOpenDialog,
                        statieId,
                        isNotLight,
                        city,
                        plugs,
                        address
                    }: StationCardProps) {
    return (
        <TableRow>
            <Card
                sx={{width: "120%", maxWidth: isNotLight ? "250px" : "450px", padding: "0px", marginLeft: "16px"}}
                onClick={() => (isNotLight ? null : handleOpenDialog!(statieId))}
            >
                <CardActionArea>
                    <TableCell style={{maxWidth: "auto", maxHeight: "auto", padding: "0"}}>
                        <CardContent style={{paddingTop: 10, paddingBottom: 0}}>
                            <Typography gutterBottom variant="h5" component="div">
                                {StatieName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" component="span">
                                <>
                                    <b>City: {city}</b><br/>
                                    <b>Address: {address}</b><br/>
                                    <b>Plugs: {plugs}</b><br/>
                                </>
                                <CardActions style={{padding: 0, marginTop: 10}} sx={{mt: 4}}>
                                    {!isNotLight ? (
                                        <Button size="small" color="primary">
                                            Claim
                                        </Button>
                                    ) : (
                                        <div></div>
                                    )}
                                </CardActions>
                            </Typography>
                        </CardContent>


                    </TableCell>
                    <TableCell style={{maxWidth: "auto", maxHeight: "auto", padding: "0", border: "0"}}>
                        <CardMedia sx={{mb: 10}}
                                   component="img"
                                   height="auto"
                                   width="200"
                                   src={imgSt}
                                   alt="green iguana"
                                   style={{
                                       maxWidth: isNotLight ? 250 : 200,
                                       marginBottom: 10
                                   }}

                        />
                    </TableCell>
                </CardActionArea>


            </Card>
        </TableRow>
    );
}

export default StatieCard;
