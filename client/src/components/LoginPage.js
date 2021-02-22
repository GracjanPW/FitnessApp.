import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Paper,
    Container,
    TextField,
    Button,
    
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      height: "100%"
    },
    loginBox: {
        width: "300px",
        height:"350px",
        transform: "translate(-50%,-50%)",
        top: "50%",
        left: "50%",
        position: "absolute",
        '& form':{
            height:"100%",
        }
    },
    button: {
        color: "white",
        fontSize:"1.5em",
        display:"block",
        width:"100%",
        bottom: "0px",
        position:"absolute",
    }
  }));

export default function LoginPage() {
    const classes = useStyles();
    return (
        <Container className={classes.root}>
            <Paper elevation={1} className={classes.loginBox}>
                <form>
                    <TextField id="outlined-basic" label="Email" variant="outlined" />
                    <TextField id="outlined-basic" label="Password" type="password" variant="outlined" />
                    <Button className={classes.button} variant="contained" color="secondary">Login</Button>
                </form>
            </Paper>

        </Container>
    )
}
