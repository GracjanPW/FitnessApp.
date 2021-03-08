import React from 'react'
import {makeStyles} from '@material-ui/styles/'
import AddIcon from '@material-ui/icons/Add'
import {
  Button,
  TextField,
  Paper,
  Fab,
  Typography,
  Modal,
  Tooltip,
} from '@material-ui/core/'
import Exercise from '../Exercise'
import apiInstance from '../../apiRequests'
import ExerciseModal from '../ExerciseModal'

const useStyles = makeStyles((theme)=>({
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
}))

export default function MyExercisesPage(props) {
  const classes = useStyles();
  const [open, triggerOpen] = React.useState(false);
  const [edit,setEdit] = React.useState({
    open:false,
    exercise:null,
  })
  React.useEffect(() =>{
    props.loadExercises()
  },[])



  const deleteExercise = async (id) => {
    const response = await apiInstance.delete('/user/exercises/',{
      data:{
        id:id,
      }
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
        exercises:newItems 
      }));
    }
        

  }

  return (
    <section className={classes.root}>
      <Typography 
        variant="h3" 
        component="h2"
      >
        My Exercises
      </Typography>
      {
        props.data.map((exercise,i)=>(
          <Exercise 
            key={i}
            openEdit={setEdit}
            exercise={exercise}
            delete={deleteExercise}
          />
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
      <ExerciseModal
        exercise={edit.exercise}
        open={edit.open}
        triggerOpen={setEdit}
        setData={props.setData}
        data={props.data}
      />
      <ExerciseModal
        open={open}
        triggerOpen={triggerOpen}
        setData={props.setData}
      />
    </section>
  )
}
