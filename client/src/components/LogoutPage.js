import React from 'react';
import {
  Redirect,
  useHistory,
} from "react-router-dom";

export default function LogoutPage(props) {
  const history = useHistory()
  const logout = () => {
    props.statusChanger(false);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    alert('you\'ve been logged out');
    history.push('/login')
  }

  React.useEffect(() => {
    logout();
  }, [])

  return (
    <div>
      
    </div>
  )
}
