import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Container,
  TextField,
  Button,

} from '@material-ui/core';
import apiInstance from './../apiRequests'

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%"
  },
  loginBox: {
    width: "300px",
    height: 'fit-content',
    paddingBottom:'2rem',
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
  },
  inputContainer :{
    width:'100%',
    padding:'0 1.5rem',
    '& > div':{
      width:'100%',
      marginBottom:'3rem'
    },
    '& div:first-child':{
      marginTop:'2rem'
    }
  }
  }));

export default function LoginPage(props) {
	const {statusChanger} = props
  const classes = useStyles();
  const [inputs,setInputs] = React.useState({
    email:"",
    password:"",
    remember:false,
  })
  const handleChange = e => {
    const { name, value } = e.target;
    setInputs(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await apiInstance.post('/token/obtain/',{
      email: inputs['email'],
      password: inputs['password'],
    }).then(response =>{
      apiInstance.defaults.headers['Authorization'] = "JWT " + response.data.access;
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
			if (response.status === 200){
				statusChanger(true);
			}
    }).catch(e =>{
      alert('Incorrect credentials')
    });
}
  return (
    <Container className={classes.root}>
      <Paper elevation={1} className={classes.loginBox}>
        <form onSubmit={handleSubmit}>
          <div className={classes.inputContainer}>
             <TextField
              id="outlined-basic"
              name="email"
              value={inputs.email}
              onChange={handleChange}
              label="Email"
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              name="password"
              value={inputs.password}
              onChange={handleChange}
              label="Password"
              type="password"
              variant="outlined"
            />
          </div>

          <Button 
            className={classes.button} 
            type="submit" 
            variant="contained" 
            color="secondary"
          >Login</Button>
        </form>
      </Paper>

    </Container>
  )
}
