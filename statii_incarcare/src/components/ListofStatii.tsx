import {useState} from "react";
import {Box, Grid} from "@mui/material";
import ResponsiveDialog from "./Dialog";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import StatieCard from "./StatieCard";
import StatieIcon from "../assets/StatieIcon.png";

interface IStatie {
    id: string;
    name: string;
    city: string;
    address: string;
    plugs: string;
    latitude: number;
    longitude: Number;
}


function ListofStatii(props: any) {

    const handleOpenDialog = (statieId: string) => {
        setOpenDialog(true);
        setCurrentStatieId(statieId);
        const found = props.statiiList.find((element: any) => element?.id === statieId);
        setCurrentStatie(found as IStatie);
    };
    const [currentStatieId, setCurrentStatieId] = useState<string>("");
    const [openDialog, setOpenDialog] = useState(false);
    const [currentStatie, setCurrentStatie] = useState<IStatie>({
        id: "3423wre2r23werw",
        name: "cv",
        city: "Timisoara",
        address: "",
        plugs: "1pc; 3dc;",
        latitude: 45.75554707085215,
        longitude: 21.22867584228516,
    });

    let navigate = useNavigate();
    const handleOpenDialogCard = () => {
        setOpenDialog(false);
    }

    const dispatch = useDispatch();


    const handleClaimDialog = () => {
        setOpenDialog(false);
        //     startTrip(userId, currentScooter.id).then((response)=> {
        //     setOpenDialog(false);

        //     setCookie("activeTrip",true);
        //     let x=response.data.trip as ITrip;
        //     depositTrip(x);
        //     navigate('/trip', { state: { scooter: currentScooter, trip:response.data.trip} });

        // }).catch(err=>{toast.error(errorHandler(err.message))});
    }

    console.log(props.statiiList?.length + " " + props.statiiList[0]?.id);
    if (props.statiiList?.length > 0) {
        return (
            <Box style={{marginLeft: "7%", marginRight: "10%", marginTop: "100px"}}>
                <ResponsiveDialog
                    open={openDialog}
                    handleOpenDialog={handleOpenDialogCard}
                    handleClaimDialog={handleClaimDialog}
                    claimHide={false}
                    paperProps={{
                        style: {
                            width: 'auto',
                            height: 'auto',
                        }
                    }}
                >
                    <StatieCard
                        StatieName={currentStatie.name}
                        statieId={currentStatie.id}
                        isNotLight
                        city={currentStatie.city}
                        address={currentStatie.address}
                        plugs={currentStatie.plugs}
                    />
                </ResponsiveDialog>
                <Grid container spacing={10}>
                    {props.statiiList.map((sc: any) => {
                            return (
                                <Grid item xs={10} md={6} lg={3} key={sc?.id} style={{paddingTop: "20px"}}>
                                    <StatieCard
                                        StatieName={sc.name}
                                        handleOpenDialog={handleOpenDialog}
                                        statieId={sc.id}
                                        city={sc.city}
                                        address={sc.address}
                                        plugs={sc.plugs}
                                    ></StatieCard>
                                </Grid>
                            );
                        }
                    )
                    }
                </Grid>
            </Box>

        )
    } else
        return (
            <>
                <Box style={{marginLeft: "auto", marginTop: "2.5rem", textAlign: "center"}}>
                    <img src={StatieIcon} style={{maxWidth: "128px"}}></img>
                    <h3>No stations are currentlly available, Sowwy :(</h3>
                    <h5>You better buy a petrol car ?</h5>
                </Box>
            </>
        )
}

export default ListofStatii;
