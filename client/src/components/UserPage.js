import React from 'react'
import {makeStyles} from '@material-ui/styles'

import Sidebar from './Sidebar';
import DashboardPage from './userpages/DashboardPage';
import MyWorkoutsPage from './userpages/MyWorkoutsPage';
import MyExercisesPage from './userpages/MyExercisesPage';
import MyGoalsPage from './userpages/MyGoalsPage';
import MyStatsPage from './userpages/MyStatsPage';
import WorkoutHistoryPage from './userpages/WorkoutHistoryPage';
import SettingsPage from './userpages/SettingsPage';
import RoutinePage from './userpages/RoutinePage'
import { Route } from 'react-router';
import apiInstance from '../apiRequests'

const useStyles = makeStyles((theme) =>({
  root:{
    height:'100%',
    paddingTop:'4rem',
    paddingLeft:'0px',
    '@media screen and (min-width: 700px)': {
      paddingLeft:'200px',
    }
  },
  
}))

const urls = [
  'dashboard',
  'routine',
  'my-workouts',
  'my-goals',
  'my-exercises',
  'workout-history',
  'my-stats',
  'settings'
]




export default function UserPage(props) {
  const classes = useStyles()
  const [data, setData] = React.useState({
    user:{
      name:"",
      lastname:"",
      dob:"",
      gender:"",
    },
    userData:{
      height:null,
      weights:null,
    },
    goals:[
    ],
    workoutHistory:{

    },
    workouts:{

    },
    exercises:[
    ]
  })
  const [apiLoader, setApiLoader] = React.useState('')

  const fetchGoals = async () =>{
    const response = await apiInstance.get('/user/goals/')
    setData((prevState) => ({
      ...prevState,
      goals: response.data.goals
    }))
  }
  const fetchExercises = async ()=>{
    const response = await apiInstance.get('/user/exercises/')
    console.log(response.data)
    setData((prevState)=>({
      ...prevState,
      exercises:[...response.data]
    }))
  }
  
  React.useEffect(()=>{
    switch(apiLoader){
      case 'goals':
        fetchGoals()
        break;
      case 'exercises':
        fetchExercises()
        break;
    }
  },[apiLoader])

  const pages = [
    (<DashboardPage/>),
    (<RoutinePage/>),
    (<MyWorkoutsPage/>),
    (<MyGoalsPage 
      data={data.goals} 
      setData={setData} 
      loadGoals={()=>setApiLoader('goals')}
    />),
    (<MyExercisesPage 
      data={data.exercises} 
      setData={setData}
      loadExercises={()=>setApiLoader('exercises')}  
    />),
    (<WorkoutHistoryPage/>),
    (<MyStatsPage/>),
    (<SettingsPage/>)
  ]
  return (
    <div className={classes.root}>
      <Sidebar urls={urls}/>
      {
        urls.map((url,i)=>(
          <Route path={`/user/${url}`}>
            {pages[i]}
          </Route>
        ))
      }
      

    </div>
  )
}
