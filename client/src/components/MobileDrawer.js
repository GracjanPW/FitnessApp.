import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import grey from '@material-ui/core/colors/grey'
import {
  Link
} from "react-router-dom";

const useStyles = makeStyles({
  root:{
    width:'100%',
  },
  button:{
    position:'absolute',
    transform:'translateX(-50%)',
    left:'50%',
    width: '100%',
    background: grey[200],
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function SwipeableTemporaryDrawer(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const anchor = "top";

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
     <List>
            <ListItem button component={Link} to={`/user/${props.urls[0]}`} key={"Dashboard"}>
              <ListItemText primary={"Dashboard"}/>
            </ListItem>
          </List>
          <Divider />
          <List>
            {['My Workouts', 'My Goals', 'My Exercises',].map((text, index) => (
              <ListItem button component={Link} to={`/user/${props.urls[index+1]}`} key={text}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['Workout History','Stats','Settings'].map((text, index) => (
              <ListItem button component={Link} to={`/user/${props.urls[index+4]}`} key={text}>

                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider/>
          <List>
            <ListItem button component={Link} to="/logout/" key="logout">
              <ListItemText primary="Logout"/>
            </ListItem>
          </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <Button className={classes.button} onClick={toggleDrawer(anchor, true)}>\/</Button>
      <SwipeableDrawer
        anchor={anchor}
        open={state[anchor]}
        onClose={toggleDrawer(anchor, false)}
        onOpen={toggleDrawer(anchor, true)}
      >
        {list(anchor)}
      </SwipeableDrawer>
    </div>
  );
}