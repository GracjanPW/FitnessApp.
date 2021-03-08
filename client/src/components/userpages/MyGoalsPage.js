import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import apiInstance from '../../apiRequests'
import { 
  Typography, 
  Divider,
  Modal,
  Tooltip,
  Fab,
  Paper,
  TextField,
  Button,
} from '@material-ui/core';

import Goal from '../Goal'

const getDate = () =>{
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  return dd + '-' + mm + '-' + yyyy;
}


const useStyles = makeStyles((theme) => ({
  root:{
    padding:'2rem',
    height:'100%',
    width:'100%',
    '@media screen and (max-width: 700px)':{
      paddingTop:'3.5rem;'
    },
    textAlign:'center',
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(5),
    right: theme.spacing(4),
  },
  modal:{
    position:'absolute',
    top:'40%',
    left:'50%',
    width:'400px',
    padding:'0.5rem 1rem',
    transform:'translate(-50%,-50%)'
  },
  button:{

  }
  
}));


export default function MyGoalsPage(props) {
  const classes = useStyles();
  const [open, triggerOpen] = React.useState(false)
  const [desc, setdDesc] = React.useState('')

  const updateGoal = async (id,value) =>{
    const response = await apiInstance.put('/user/goals/',{
      id:id,
      done:value
    })
    if (response.status ==200){
      let newItems = [...props.data];
    for (let i=0;i<newItems.length;i++){
        if (newItems[i]['id'] === id){
            console.log(i,id, value)
            newItems[i]['done'] = value
        }
    }
    props.setData(prevState => ({
      ...prevState, 
      goals:newItems 
    }));
    }
    
    
  }

  const deleteGoal = async (id,e) => {
    const response = await apiInstance.put('/user/goals/',{
      id:id,
      delete:true
    })
    if (response.status === 200){
      let newItems = [...props.data];
      for (let i=0;i<newItems.length;i++){
          if (newItems[i]['id'] === id){
              newItems.splice(i,1)
          }
      }
      props.setData(prevState => ({
        ...prevState, 
        goals:newItems 
      }));
    }
        

  }

  const addGoal = async (e) => {
    e.preventDefault();
    const response = await apiInstance.put('/user/goals/',{
      desc:desc,
      created:getDate()
    })
    triggerOpen(false);
    setdDesc('');
    if (response.status == 200){
      props.setData(prevState => ({
          ...prevState,
          goals:[...prevState.goals,response.data]
      }))
    }
      
  }

  React.useEffect(() =>{
    props.loadGoals()
  },[])

  return (
    <section className={classes.root}>
      <Typography variant="h3" component="h2">
        My Goals
      </Typography>
      <br/>
      <Divider />
      <Typography variant="h4" component="h3">
        To Do
      </Typography>
      <Divider />
      {
        props.data.map((goal, i)=>(
          !goal.done ?
          <Goal 
            update={updateGoal}
            delete={deleteGoal}
            key={`goal ${i}`} 
            goal={goal}
          />
          :<></>
        ))
      }
      <Divider />
      <Typography variant="h4" component="h3">
        Complete
      </Typography>
      <Divider />
      {
        props.data.map((goal, i)=>(
          goal.done ?
          <Goal
            update={updateGoal}
            delete={deleteGoal}
            key={`goal ${i}`} 
            goal={goal}/>:<></>
        ))
      }

      <Tooltip title="Add" aria-label="add">
        <Fab 
          onClick={()=>triggerOpen(true)}
          color="secondary" 
          size="large" 
          className={classes.fab}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
      <Modal
        open={open}
        onClose={()=>triggerOpen(false)}

      >
        <form onSubmit={addGoal}>
          <Paper elevation={2} className={classes.modal}>
            <TextField
                id="outlined-basic"
                name="desc.."
                value={desc}
                onChange={(e)=>setdDesc(e.target.value)}
                label="desc"
                variant="outlined"
              />
              <Button 
                className={classes.button} 
                type="submit" 
                variant="contained" 
                color="secondary"
              >ADD</Button>
          </Paper>
        </form>
        
      </Modal>
    </section>
  )
}
