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
import {Checkbox, InputLabel, Link} from '@mui/material';


const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function CreateAccount(){

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
                    marginTop:"30px",
                    height: "90vh",
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
                        Create Account
                    </Typography>
                    <Box
                        component="form"

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
                        <TextField
                            variant="filled"
                            margin="normal"
                            required
                            fullWidth
                            name="repeatPassword"
                            label="Repeat password"
                            type="repeatPassword"
                            id="Password"
                            autoComplete="repeat-current-password"
                            sx={{ backgroundColor: "white" }}
                        />
                        <Grid container spacing={2}>
                            <Grid item xs={8}
                                  sx={{
                                      marginTop:"10px",
                                  }}
                            >
                                    <InputLabel >Administrator account</InputLabel>
                            </Grid>
                            <Grid item xs={2}>
                                    <Checkbox   color="secondary" ></Checkbox>
                            </Grid>
                        </Grid>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, backgroundColor: "#4a4a4a" }}
                        >
                            Create account
                        </Button>
                        <Typography align="center"></Typography>
                    </Box>
                </Box>
            </Grid>

        </Grid>
    );
}

export default CreateAccount;