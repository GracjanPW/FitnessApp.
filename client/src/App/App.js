import './App.css';
import React from 'react';
import {
  makeStyles, 
  createMuiTheme, 
  ThemeProvider,

} from '@material-ui/core';
import {
  blue,
  yellow
} from '@material-ui/core/colors';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Navbar from '../components/Navbar';
import LoginPage from '../components/LoginPage';
import HomePage from '../components/HomePage'
import RegisterPage from '../components/RegisterPage';
import LogoutPage from '../components/LogoutPage';
import UserPage from '../components/UserPage'
import apiInstance from '../apiRequests';
import { FormatListBulletedTwoTone } from '@material-ui/icons';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue['A400'],
    },
    secondary: {
      main: yellow[600],
    },
  },
});

const useStyles = makeStyles({
  nav: {
    display:'flex',
    flexDirection:'row',
    left: '0px',
    width: '100%',
    height: '100px',
    backgroundColor:'#ff1067'
  }
})

export default function App() {
  const classes = useStyles();
  const [loggedIn, setLoginStatus] = React.useState(false)

  const getUser = React.useCallback(
    async (e) => {
      try {
        const response = await apiInstance.get('/user/');
        
    } catch (e) {
        throw e
    }
    }
  )

  const checkLoggedIn = async () =>{
    const refresh_token = localStorage.getItem('refresh_token')
    if (refresh_token){
      try{
      const response = await apiInstance.post('/token/refresh/',{refresh:localStorage.getItem('refresh_token')})
      apiInstance.defaults.headers['Authorization'] = "JWT " + response.data.access;
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      setLoginStatus(true)
      return true;
    } catch (e){
      throw(e)
    }
    } else {
      alert('you\'ve been logged out')
    }
    return false
    
  }

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar key="navbar" loggedIn={loggedIn}/>
        <Switch>
          <Route path="/user/">
            { !loggedIn ? <Redirect to="/login/"/>:<UserPage/>}
          </Route>
          <Route path="/login/" >
            { loggedIn ? <Redirect to="/user/"/>: <LoginPage statusChanger={setLoginStatus}/>}
          </Route>
          <Route path="/register/">
            { loggedIn ?<Redirect to="/user/"/>: <RegisterPage/>}
          </Route>
          <Route path="/logout/">
            <LogoutPage statusChanger={setLoginStatus}/>
          </Route>
          <Route path="/profile_setup/">
            
          </Route>
          <Route path="/">
            { loggedIn ? <Redirect to="/user/"/>:<HomePage/> }
          </Route>
          
        </Switch>
      </Router>
    </ThemeProvider>
  );
}


