import React from 'react'
import {makeStyles} from '@material-ui/styles'
import {
  Modal,
  Paper,
  TextField,
  Button,
} from '@material-ui/core'
import apiInstance from '../apiRequests'

const useStyles = makeStyles((theme)=>({
  root:{
    position:'absolute',
    top:'40%',
    left:'50%',
    transform:'translate(-50%,-50%)'
  },
  container: {
    width: "300px",
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
  instructionInputs:{
    width:'100%',
    maxHeight:'150px',
    overflowY:'auto',
    padding:'0 3rem',
    '& > div':{
      width:'100%',
      marginBottom:'0.5rem'
    },
    '& div:last-child':{
      marginBottom:'1rem'
    }
  },
  button:{
    display:'block',
    width:'100%'
  }
}))


export default function AddExerciseModal(props) {
  const {open,triggerOpen} = props
  const classes = useStyles()
  const [inputs,setInputs] = React.useState({
    name:'',
    desc:'',
    instructions:[''],
  })
  const handleInput = e =>{
    const {name,value} = e.target
    setInputs(prevState=>({
      ...prevState,
      [name]:value
    }))
  }
  const handleInstructions = e =>{
    const {name ,value} = e.target
    const i = parseInt(name)
    let newInstructions = inputs.instructions
    if (value==''&&inputs.instructions.length>1){
      newInstructions.splice(i,1)
    } else {
      newInstructions[i] = value
    }
    if (newInstructions[newInstructions.length-1]!=''){
      newInstructions.push('')
    }
    setInputs(prevState=>({
      ...prevState,
      instructions:newInstructions
    }))
  }
  const updateExercise = async () =>{
    const {id} = props.exercise
    inputs.instructions.splice(inputs.instructions.length-1,1)
    const response = await apiInstance.put('/user/exercises/',{
      id:id,
      name:inputs.name,
      desc:inputs.desc,
      instructions:inputs.instructions,
    })
    triggerOpen({
      open:false,
      exercise:null,
    })
    console.log(response.data)
    if (response.status ==200){
      let newItems = [...props.data];
      for (let i=0;i<newItems.length;i++){
          if (newItems[i]['id'] === id){
              newItems[i] = response.data
        }
    } 
    props.setData(prevState => ({
      ...prevState, 
      exercises:[...newItems] 
    }));
    }
    
  }
  const addExercise = async () => {
    const data = inputs
    data.instructions.splice(data.instructions.length-1,1)
    const response = await apiInstance.post('/user/exercises/',data)
    triggerOpen(false);
    setInputs({
      name:'',
      desc:'',
      instructions:[''],
    })
    if (response.status == 200){
      props.setData(prevState => ({
          ...prevState,
          exercises:[...prevState.exercises,response.data]
      }))
    } else{
      alert('something went wrong')
    }
  }
  const handleForm = e =>{
    e.preventDefault();
    if (props.exercise || false){
      updateExercise()
    } else{
      addExercise();
    }
  }
  React.useEffect(()=>{
    if (props.exercise || false){

      setInputs({
        name:props.exercise.name,
        desc:props.exercise.desc,
        instructions:[...props.exercise.instructions,'']
      })
    }
  },[open])
  return (
    <Modal
        open={open}
        onClose={()=>triggerOpen(false)}
      >
        <form className={classes.root} onSubmit={handleForm}>
          <Paper 
            elevation={2} 
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
            <TextField
              id="outlined-basic"
              name="desc"
              value={inputs.desc}
              onChange={handleInput}
              label="Description"
              variant="outlined"
            /> 
            </div>
            <div className={classes.instructionInputs}>
              
                {     
                  inputs.instructions.map((item,i)=>(
                  <TextField
                    key={i}
                    id="outlined-basic"
                    name={i}
                    value={item}
                    onChange={handleInstructions}
                    label={`step ${i+1}`}
                  />
                  ))
                }
              
            
            </div>
            
            
            <Button 
              className={classes.button} 
              type="submit" 
              variant="contained" 
              color="secondary"
            >
              {props.exercise || false ? 'Update':'Add'}
            </Button>
          </Paper>
        </form>
      </Modal>
  )
}
