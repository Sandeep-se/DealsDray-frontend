import React, { useState } from 'react'
import './Login.css'
import axios from 'axios'
import { Link,useNavigate } from 'react-router-dom'

const Login = ({setIsLoggedIn}) => {
    const [name,setName]=useState('')
    const [password,setPassword]=useState('')
    const navigate=useNavigate()
    const login=async(e)=>{
        e.preventDefault()
        const response=await axios.post('http://localhost:8000/login',{name,password},{withCredentials:true})
        try{
          if(response.data.message==='login success'){
              setIsLoggedIn(true)
              navigate('/home')
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
  return (
    <div className='login'>
        <div className='login_logo' >DealsDray</div>
        <div className='login_container'>
            <h1>Login</h1>
            <form>
                <h5>username</h5>
                <input type='text' value={name} onChange={(e)=>setName(e.target.value)}/> 
                
                <h5>Password</h5>
                <input type='password' value={password} onChange={e=>setPassword(e.target.value)}/>
                <p></p>
                <button type='submit' onClick={login} className='login_button'>Login</button>
            </form>
             <Link to='/login/register' ><button type='submit' className='register_button'>Create Your Account</button></Link>
        </div>
    </div>
  )
}

export default Login
