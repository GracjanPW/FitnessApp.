import './App.css';
import {
  makeStyles, 
  createMuiTheme, 
  ThemeProvider,
} from '@material-ui/core'
import {
  blue,
  yellow
} from '@material-ui/core/colors'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Navbar from './../components/Navbar'
import LoginPage from './../components/LoginPage'


const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue['A400'],
    },
    secondary: {
      main: yellow[600],
    },
  },
});

const useStyles = makeStyles({
  nav: {
    display:'flex',
    flexDirection:'row',
    left: '0px',
    width: '100%',
    height: '100px',
    backgroundColor:'#ff1067'
  }
})

export default function App() {
  const classes = useStyles();
  const [data, setData] = useState({
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
    goals:{

    },
    workoutHistory:{

    },
    workouts:{

    },
    exercises:{
      
    }
  })
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar key="1"/>
        <Switch>
          <Route path="/login/" >
            <LoginPage/>
          </Route>
          <Route path="/register/">
            
          </Route>
          <Route path="/logout/">
            
          </Route>
          <Route path="/profile_setup/">
            
          </Route>
          <Route path="/">

          </Route>
          
        </Switch>
      </Router>
    </ThemeProvider>
  );
}


