import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    AppBar, 
    Toolbar,
    Typography,
    Button,
    IconButton,
    MenuIcon,

} from '@material-ui/core';

import {
    Link
  } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Navbar(props) {
  const classes = useStyles();
  const [loc, setLoc] = React.useState("/")

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
					<div className={classes.title}>
						<Button onClick={() => setLoc("/")} component={Link} to="/" color="inherit">
							<Typography variant="h4" >
								<strong >FIT'N'WIN</strong>
							</Typography>
						</Button>
					</div>
          {loc == "/login" ? <></>:<Button onClick={() => setLoc("/login")} color="inherit" component={Link} to="/login">Login</Button>}
          {loc == "/register" ? <></>:<Button onClick={() => setLoc("/register")} color="inherit" component={Link} to="/register">Register</Button>}
        </Toolbar>
      </AppBar>
    </div>
  );
}