import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import EmployeeAdd from './EmployeeAdd';

import Home from './Home';
import Login from './Login';
import Register from './Register';
import EmplyeeList from './EmplyeeList';
import Header from './Header';
import EditEmployee from './EditEmployee';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie'

function App() {
  const [isLoggedIn,setIsLoggedIn]=useState(false);

  useEffect(()=>{
    const token=Cookies.get('userInfo')
    console.log(token)
    if(token)
    {
      setIsLoggedIn(true)
    }
    else{
      setIsLoggedIn(false)
    }
  },[])
  return (
    <Router>
      <div className="App">

        {isLoggedIn && <Header setIsLoggedIn={setIsLoggedIn}/>}
        <Routes>

          <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />} />

          <Route path='/login/register' element={<Register/>}/>
          <Route path='/login' element={isLoggedIn?<Navigate to="/home"/>:<Login setIsLoggedIn={setIsLoggedIn}/>}/>

          <Route path='/home' element={isLoggedIn?<Home/>:<Navigate to='/login'/>}/>
          <Route path='/createEmployee' element={isLoggedIn?<EmployeeAdd/>:<Navigate to='/login'/>}/>
          <Route path='/employeeList'element={isLoggedIn?<EmplyeeList/>:<Navigate to='/login'/>}/>
          <Route path='/updateEmployee/:employeeId' element={isLoggedIn?<EditEmployee/>:<Navigate to='/login'/>}/>
        </Routes> 
      </div>
    </Router>
  );
}

export default App;
