import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {
  Drawer,
  Toolbar,
  List,
  Divider,
  ListItem,
} from '@material-ui/core/'

import {
  Link
} from "react-router-dom";

import MobileDrawer from './MobileDrawer'
const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root:{

  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    overflowX:'hidden',
    transistion: '0.5s'
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  drawerBottom: {
    position: "absolute",
    bottom: 0,
    width: '100%',
    background: theme.palette.error.main,
  }
}));



export default function Sidebar(props) {
  const urls = props.urls
  const classes = useStyles()

  const [changeBar, setChangeBar] = React.useState(
    window.matchMedia("(max-width:700px").matches ? true : false
  );

  React.useEffect(() =>{
    function handleResize() {
      if (window.matchMedia("(max-width:700px").matches){
        setChangeBar(true)
      } else {
        setChangeBar(false)
      }
      
    }
    window.addEventListener('resize', handleResize)
  })
  
  return (
    <aside className={classes.root}>
      {
        changeBar
        ?
        <MobileDrawer urls={props.urls}/>
        :
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            <ListItem button component={Link} to={`/user/${urls[0]}`} key={"Dashboard"}>
              <ListItemText primary={"Dashboard"}/>
            </ListItem>
          </List>
          <Divider />
          <List>
            {['My routine','My Workouts', 'My Goals', 'My Exercises',].map((text, index) => (
              <ListItem button component={Link} to={`/user/${urls[index+1]}`} key={text}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['Workout History','Stats','Settings'].map((text, index) => (
              <ListItem button component={Link} to={`/user/${urls[index+5]}`} key={text}>

                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <div className={classes.drawerBottom}>
          <Divider/>
          <List>
            <ListItem button component={Link} to="/logout/" key="logout">
              <ListItemText primary="Logout"/>
            </ListItem>
          </List>
          </div>
        </div>
      </Drawer>
      }
    </aside>
    
  )
}
