import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Register.css'
import axios from 'axios'

const Register = () => {
    const [name,setName]=useState('')
    const [password,setPassword]=useState('')
    const navigate=useNavigate()

    const register=async(e)=>{
        e.preventDefault()
        const response=await axios.post('http://localhost:8000/register',{name,password},{withCredentials:true})
        try{
          if(response.data.message==='register success'){
              navigate('/login')
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
            <h1>Register</h1>
            <form>
                <h5>username</h5>
                <input type='text' value={name} onChange={(e)=>setName(e.target.value)}/> 
                
                <h5>Password</h5>
                <input type='password' value={password} onChange={e=>setPassword(e.target.value)}/>
                <p></p>
                <button type='submit' onClick={register} className='login_button'>Register</button>
            </form>

            <Link to='/login'><button type='submit' className='register_button'>Already have Account</button></Link>
        </div>
    </div>
  )
}

export default Register
