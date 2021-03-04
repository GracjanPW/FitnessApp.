import React from 'react'
import {
  Paper, 
  Checkbox,
  IconButton
} from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root:{
    margin:'1rem',
    padding:'0.5rem',
    textAlign:'left',
    fontSize:'1.5em',
    position:'relative'
  },
  stickRight:{
    display:'inline',
    position:'absolute',
    right: '0px',
    top:'50%',
    transform:'translateY(-50%)',
  },
  stickLeft:{
    display:'inline',
  }
}))

export default function Goal(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <div className={classes.stickLeft}>
        {props.goal.desc}
        
      </div>
      <div className={classes.stickRight}>
        <Checkbox 
          checked={props.goal.done}
          onChange={() =>{
            props.update(props.goal.id, !props.goal.done)
          }}
        />
        <IconButton 
          type="button"
          onClick={(e)=>{
            props.delete(props.goal.id)}
          } 
          aria-label="delete"
        >
          <DeleteIcon />
        </IconButton> 
      </div>
      
    </Paper>
  )
}
