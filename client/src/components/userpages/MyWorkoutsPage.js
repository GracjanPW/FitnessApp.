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
  Grid,
} from '@material-ui/core/'
import apiInstance from '../../apiRequests'
import Workout from '../Workout'
import WorkoutModal from '../WorkoutModal'

const useStyles = makeStyles((theme)=>({
  root:{
    padding:'2rem',
    height:'100%',
    width:'100%',
    '@media screen and (max-width: 700px)':{
      paddingTop:'3.5rem;'
    },
    textAlign:'center',
    flexGrow:1,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(5),
    right: theme.spacing(4),
  },
}))

export default function MyWorkoutsPage(props) {
  const classes = useStyles()
  const [openModal,setOpenModal] = React.useState(false)
  const {workouts,exercises} = props.data
  const [gridItems,setGridItems] = React.useState([])

  React.useEffect(async ()=>{
    await props.loadWorkouts()
    await props.loadExercises()
    
    genarateGridItems(props)
  },[])
  const getWorkoutExercises = (workout) =>{
    var workoutExercises =[]
    for (const exercise of workout.exercises){
      if ('exerciseId' in exercise){
        for (const ex of exercises){
          if (ex.id == exercise.exerciseId) {
            workoutExercises.push(ex)
          }
        }
      }
    }
    return workoutExercises
  }

  const genarateGridItems = () =>{
    setGridItems([])
    const itemsPerRow = 3
    const items = workouts.length
    var item = 1;
    const rows = Math.ceil(items/itemsPerRow)
    for (var row=1;row<=rows;row++){
      var gridRow = []
      for (item;item<=row*itemsPerRow && item <= items;item++){
        gridRow.push(
          <Grid item xs={12/itemsPerRow}>
            <Workout workout={workouts[item-1]} exercises={getWorkoutExercises(workouts[item-1])} />
          </Grid>
        )
      }
      setGridItems(prevState =>([
        ...prevState,
        gridRow
      ]))
    }
  }
  return (
    <div className={classes.root}>
      <Typography variant="h3" component="h2">
        My Workouts
      </Typography>
      <br/>
      <Grid container spacing={1}>
        {gridItems}
      </Grid>
      <Tooltip title="Add" aria-label="add">
        <Fab 
          onClick={()=>setOpenModal(true)}
          color="secondary" 
          size="large" 
          className={classes.fab}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
      <WorkoutModal
        open={openModal}
        triggerOpen={setOpenModal}
        setData={props.setData}
        exercises={exercises}
      />
    </div>
  )
}
