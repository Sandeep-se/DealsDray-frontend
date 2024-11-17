import React, { useEffect, useState } from 'react'
import './Header.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Header = ({setIsLoggedIn}) => {
  const Cursor={cursor:'pointer',color:'red',padding:'10px'};
  const [userName,setUserName]=useState('Guest')
  const navigate=useNavigate()
  const logout=async()=>{
    const response=await axios.post('http://localhost:8000/logout',{},{withCredentials:true})
        try{
          if(response.data.message==='Logout successful'){
              setUserName('Guest');
              setIsLoggedIn(false)
              // navigate('/login')
          }
          else{
            alert(response.data.message)
          }
        }
        catch(err)
        {
          console.log(err.message)
          alert(err.message)
        }
  }
  const getCookieValue = (cookieName) => {
    const cookieString = document.cookie;
    const cookies = cookieString.split('; ');
    for (let cookie of cookies) {
      const [key, value] = cookie.split('=');
      if (key === cookieName) {
        try {
          const parsedValue = JSON.parse(decodeURIComponent(value));
          return parsedValue.name;
        } catch (error) {
          console.error('Error parsing cookie:', error);
          return null;
        }
      }
    }
    return null;
  };

  useEffect(() => {
    const name = getCookieValue('userInfo');
    if (name) setUserName(name);
  }, []);
  return (
    <div className='header'>
       <Link to='/home'><div>Home</div></Link>
       <Link to='/employeeList'><div>Employee List</div></Link>
       <div>Hello :{" "}{userName}</div>
       <div style={Cursor} onClick={()=>logout()}>Logout</div>
    </div>
  )
}

export default Header
