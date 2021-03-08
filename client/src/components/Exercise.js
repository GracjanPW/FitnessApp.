import React from 'react'
import {
  Paper,
  Typography,
  IconButton,
  Divider,

} from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
} from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import ExerciseModal from './ExerciseModal'

const useStyles = makeStyles((theme) => ({
  root:{
    margin:'1rem',
    padding:'0.5rem',
    textAlign:'left',
    fontSize:'1.5em',
    position:'relative',
    paddingRight:'6rem',
    zIndex:'10',
  },
  extended:{
    padding:'1rem 0.5rem 0.5rem 0.5rem',
    margin:'-1.5rem 1rem 1rem 1rem',
    position:'relative',
    textAlign:'left',

  },
  stickRight:{
    display:'inline',
    position:'absolute',
    right: '0px',
    top:'50%',
    transform:'translateY(-50%)',
    borderLeft:'1px solid lightgray'
  },
  stickLeft:{
    display:'inline',
    width:'100%',
  }
}))

export default function Exercise(props) {
  const {exercise} = props 
  const [openEdit,setOpenEdit] = React.useState(false)
  const classes = useStyles();
  const [expand, setExpand] = React.useState(false)
  return (
      <ClickAwayListener onClickAway={()=>setExpand(false)}>
        <>
        <Paper elevation={2} className={classes.root} >
          <div 
            className={classes.stickLeft}
            onClick={()=>setExpand(!expand)}
          >
            <Typography 
              variant="h5" 
              component="h3">
              {exercise.name}
            </Typography>
          </div>

          <div className={classes.stickRight}>
            <IconButton
              onClick={()=>props.openEdit({
                open:true,
                exercise:exercise,
              })}
            >
              <EditIcon/>
            </IconButton>
            <IconButton
              onClick={()=>props.delete(exercise.id)}
            >
              <DeleteIcon/>
            </IconButton>
          </div>
        </Paper>
        {
          expand ? 
          <Paper className={classes.extended}>
            <ol>
            {exercise.instructions.map((item,i)=>(
              <li>{item}</li>
            ))}
            </ol>
            
          </Paper>
          :<></>
        }
        </>
      </ClickAwayListener>
      
      

    
  )
}
