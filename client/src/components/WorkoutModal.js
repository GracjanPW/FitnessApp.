import React from 'react'
import {makeStyles} from '@material-ui/styles'
import {
  Modal,
  Paper,
  TextField,
  Button,
  ButtonGroup,
  Typography,
  InputAdornment,
} from '@material-ui/core'
import {
  Delete as DeleteIcon,
  Edit,
  Edit as EditIcon,
} from '@material-ui/icons'
import apiInstance from '../apiRequests'

const useStyles = makeStyles((theme)=>({
  
  root:{
    position:'absolute',
    top:'40%',
    left:'50%',
    transform:'translate(-50%,-50%)',
    textAlign:'center'
  },
  container: {
    width: "400px",
    height: 'fit-content',
    transform: "translate(-50%,-50%)",
    top: "50%",
    left: "50%",
    position: "absolute",
  },
  inputs:{
    width:'100%',
    padding:'0 1rem',
    '& > div':{
      width:'100%',
      marginBottom:'2rem'
    },
    '& div:first-child':{
      marginTop:'1rem'
    }
  },
  addExercises:{
    padding:'0 1rem',
    maxHeight:'250px',
    overflowY:'auto',
    maxHeight:'300px'
  },
  exerciseInputs:{
    width:'100%',
    padding:'0.5rem 1rem',
    display:'flex',
    justifyContent:'space-between',
    '& > div':{
      width:'40px',
      padding:'0px',
      '& input':{
        padding:'5px',
      },
      '& label':{
        transform: 'translate(14px, 8px) scale(1)'
      }


    },
  },
  exerciseButtons:{

  },
  addButtons:{
    width:'100%',
    padding:'0.5rem 1rem',
    '& button':{
      width:'50%'
    }
  },
  button:{
    display:'block',
    width:'100%'
  }
}))

export default function WorkoutModal(props) {
  const {exercises} = props
  const classes = useStyles()
  const {open,triggerOpen} = props
  const [inputs,setInputs] = React.useState({
    name:'',
    exercises:[]
  })
  const handleInput = e =>{
    const {name,value} = e.target
    setInputs(prevState=>({
      ...prevState,
      [name]:value
    }))
  }
  const handleTimeInput = (e,i) =>{
    
  }
  const handleInputs = (e,pos) => {
    var exercises = inputs.exercises
    exercises.map((ex,i)=>{
      if (pos==i){
        exercises[pos][e.target.name] = e.target.value
      }
    })
    setInputs(prevState =>({
      ...prevState,
      exercises:[...exercises]
    }))
  }
  const handleSubmit = e =>{
    e.preventDefault()
  }
  const excerciseInput = (id,key) =>{
    var name = 'not found'
    console.log(exercises)
    for (var ex of exercises){
      console.log('ex.id ', ex.id, ex.name)
      if (ex.id == id || false){
        console.log('3')
        name = ex.name
      }
    }

    return <div key={key} className={classes.exerciseInputs}>
      {name}
      <TextField
          label="R"
          name="reps"
          variant="outlined"
          value={inputs.exercises[key].reps}
          onChange={(e)=>handleInputs(e,key)}
        />
        <TextField
          label="S"
          name="sets"
          variant="outlined"
          value={inputs.exercises[key].sets}
          onChange={(e)=>handleInputs(e,key)}
        />
        <TextField
          label="T"
          name="time"
          variant="outlined"
          value={inputs.exercises[key].time}
          onChange={(e)=>handleInputs(e,key)}
        />

        <Button
          variant="outlined"
        >
          <DeleteIcon/>
        </Button>

      </div>
  }
  const breakInput = (key)=>{
    return <div key={key} className={classes.exerciseInputs}>
      Break
      <TextField
        label="T"
        name="time"
        variant="outlined"
        value={inputs.exercises[key].time}
        onChange={(e)=>handleInputs(e,key)}
      />

      <Button
        variant="outlined"
      >
        <DeleteIcon/>
      </Button>

    </div>
  }
  React.useEffect(()=>{
    if (props.workout || false){

      setInputs({
        name:props.workout.name,
        exercises:[...props.workout.exercises]
      })
    }
  },[open])
  return (
    <Modal
      open={open}
      onClose={()=>triggerOpen(false)}
    >
      <form className={classes.root} onSubmit={handleSubmit}>
        <Paper 
          elavation={2} 
          className={classes.container}
        >
          <div className={classes.inputs}>
             <TextField
              id="outlined-basic"
              name="name"
              value={inputs.name}
              onChange={handleInput}
              label="Name"
              variant="outlined"
            />
          </div>
          <Typography variant="h4" component="h4">
            Exercsises
          </Typography>
          <div className={classes.addExercises}>
            <hr/>
            {inputs.exercises.map((ex,i)=>(<>
              <div>
                {
                  ex.exerciseId || false ?
                  (excerciseInput(ex.exerciseId,i)) :
                  (breakInput(i))
                }
              </div>
              <hr/></>
            ))}
          </div>
          <ButtonGroup 
             color="primary" 
             aria-label="contained primary button group"
             className={classes.addButtons}
            >
              <Button>Add Exercise</Button>
              <Button>Add Break</Button>
            </ButtonGroup>
          <Button 
              className={classes.button} 
              type="submit" 
              variant="contained" 
              color="secondary"
            >
              {props.workout || false ? 'Update':'Add'}
            </Button>
        </Paper>
      </form>
    </Modal>
  )
}
