import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Container,
  TextField,
  Button,
  Typography,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import apiInstance from './../apiRequests' 

const useStyles = makeStyles((theme) =>({
  "root":{
    height:'100%',
  },
  "regBox":{
    width: "300px",
    height: 'fit-content',
    paddingBottom:'2rem',
    transform: "translate(-50%,-50%)",
    top: "50%",
    left: "50%",
    position: "absolute",
    '& form':{
      height:"100%",
    },
    '& h2':{
      textAlign:'center',
      margin:'1.5rem 0'
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
    
  }
})) 

export default function RegisterPage() {
  const classes = useStyles()
	const history = useHistory()
  const [inputs,setInputs] = React.useState({
    "email":"",
    "password1":"",
    "password2":"",
  })
  const handleChange = e =>{
    const { name, value } = e.target;
    setInputs(prevState => ({
      ...prevState,
      [name]: value
    }));
  }
	const handleSubmit = async (e) =>{
		e.preventDefault();
		if (inputs.password1 == "" || inputs.email ==""){
			alert('please fill in all fields')
		} else if (inputs.password1 != inputs.password2){
			alert('passwords dont match')
		} else if (inputs.password1.length < 8) {
			alert('password too short')
		} else{
			const request = await apiInstance.post('/user/create/',{
				email:inputs.email,
				password:inputs.password1
			}).then(response =>{
				return response
			}).catch( e =>{
				alert('account not created, try again')
				console.log(e)
			})
			if (request.status == 201){
					apiInstance.post('/token/obtain/',{
					email: inputs.email,
					password: inputs.password1,
				}).then(response =>{
					apiInstance.defaults.headers['Authorization'] = "JWT " + response.data.access;
					localStorage.setItem('access_token', response.data.access);
					localStorage.setItem('refresh_token', response.data.refresh);
				}).catch(e =>{
					alert('Incorrect credentials')
				});
				alert('Account created');
				history.push("/User/")
			}
		}
		
	}
  return (
    <Container className={classes.root}>
      <Paper elevation={1} className={classes.regBox}>
        <form onSubmit={handleSubmit}>
					<Typography variant="h5" component="h2">
						Create an account
					</Typography>
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
							name="password1"
							value={inputs.password1}
							onChange={handleChange}
							label="Password" 
							variant="outlined"
							type="password"
						/>
						<TextField 
							id="outlined-basic"
							name="password2"
							value={inputs.password2}
							onChange={handleChange}
							label="Confirm password" 
							variant="outlined" 
							type="password"
						/> 
					</div>
					
					<Button 
						className={classes.button} 
						type="submit" 
						variant="contained" 
						color="secondary"
					>
						Login
					</Button>
				</form>

      </Paper>
    </Container>
  )
}
