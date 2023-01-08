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
import { Link } from '@mui/material';
import {logIn} from "../api/login";
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import { getCookie, setCookie } from "typescript-cookie";
import { useDispatch } from "react-redux";
import * as actionCreators from "../reducers/start/user/actionUser"
import { bindActionCreators } from "redux";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function Login(){

    const [email,setEmail] = useState<string>("");
    const [isAdmin,setIsAdmin] = useState<boolean>(false);
    const [userId,setIdUser] = useState<string|undefined>(undefined);
    const [loading, setLoading] = useState(false);
    const [isLogged,setIsLogged] = useState<boolean>(false);
    const navigate = useNavigate();

    const dispatch= useDispatch();
    const {setUser}=bindActionCreators(actionCreators,dispatch);

    React.useEffect(() => {
        let x = getCookie("id");
        let y = getCookie("isAdmin");
        if(x != undefined) {
            if (y !== "true")
                navigate('/home')
            else
                navigate('/addstation');
        }
    },[userId]);

    //login and redirect to homepage and set cookie
    const loginAccount = (event: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        logIn(data.get("username") as string,data.get("password") as string).then((response) => {
            setIsLogged(true);
            if(response.data.isAdmin == "True")
                setIsAdmin(true);
            setIdUser(response.data.id);
            setUser({id:response.data.id,isAdmin:isAdmin} as IUser);
            setEmail(response.data.email);
            setCookie("id", response.data.id, { expires: 7 });
            setCookie("isAdmin", response.data.isAdmin, { expires: 7 })
            if(response.data.isAdmin === "false")
                navigate("/home");
            else
                navigate("/addstation");

        }).catch((err) =>{
            console.log(err.message);
        }).finally(() => setLoading(false));
    };

    return(
        <Grid
            container
            justifyContent="center"
            component="main"
            sx={{
                height: "100vh",
                backgroundImage: "linear-gradient(#fc8c9f, #61f59c)",
            }}
        >
            <CssBaseline />
            <Grid
                item
                xs={12}
                sm={8}
                md={5}
                component={Paper}
                elevation={6}
                square
                sx={{
                    marginTop:"70px",
                    height: "80vh",
                    borderRadius: "16px",
                    backgroundImage: "linear-gradient(#b5fff2, #75efa4)",
                }}
            >
                <Box
                    sx={{
                        my: 20,
                        mx: 10,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        mt: 10,
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "#ef85e5" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={loginAccount}
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            variant="filled"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            sx={{ backgroundColor: "white" }}
                            //onChange={(e)=>setEmail(e.currentTarget.value)}
                        />
                        <TextField
                            variant="filled"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            sx={{ backgroundColor: "white" }}

                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, backgroundColor: "#4a4a4a" }}
                        >
                            Sign In
                        </Button>
                        <Typography align="center"></Typography>
                    </Box>
                    <Link href="/create">Already have account? Sign in</Link>
                </Box>
            </Grid>

        </Grid>
    );
}

export default Login;
