import React from 'react'
import {
  Paper,
  Typography,
  IconButton,
  Divider,
  Icon,

} from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  PlayCircleOutline as StartIcon,
} from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import WorkoutModal from './WorkoutModal'
 
const useStyles = makeStyles((theme)=>({
  root: {
    padding: '1 0.5rem',
    paddingTop:'1.5rem',
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}))

export default function Workout(props) {
  const classes = useStyles()
  const {workout, exercises} = props 
  const [openEdit,setOpenEdit] = React.useState(false)
  return (
    <>
      <Paper elevation={2} className={classes.root}>
        {workout.name}
        <br/>
        <IconButton>
          <StartIcon/>
        </IconButton>
        <IconButton onClick={()=>setOpenEdit(true)}>
          <EditIcon/>
        </IconButton>
        <IconButton>
          <DeleteIcon/>
        </IconButton>

      </Paper>
      <WorkoutModal
          open={openEdit}
          triggerOpen={setOpenEdit}
          setData={props.setData}
          workout={workout}
          exercises={exercises}
    />
    </>
  )
}
