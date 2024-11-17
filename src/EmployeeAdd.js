import React, { useState } from 'react'
import './EmployeeAdd.css'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const EmployeeAdd = () => {
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [mobileNo,setMobileNo]=useState('')
    const [designation,setDesignation]=useState('')
    const [gender,setGender]=useState('')
    const [course,setCourse]=useState('')
    const [image,setImage]=useState('')
    const navigate=useNavigate()
    const handleSubmit=async(e)=>{
        e.preventDefault()
        const formData=new FormData();
        formData.append("name",name)
        formData.append("email",email)
        formData.append("mobileNo",mobileNo)
        formData.append("designation",designation)
        formData.append("gender",gender)
        formData.append("course",course)
        formData.append("img",image)
        try {
          const response=await axios.post('http://localhost:8000/addEmployee',formData,
            {
                headers:{
                  "Content-Type": "multipart/form-data",
                },
                withCredentials:true
            })
            if(response.data.message==='please login'){
              navigate('/login')
            }
            else if(response.data.message==='Employee created succesfully'){
              navigate('/employeeList')
            }
            else{
              alert(response.data.message)
            }
        } catch (error) {
          console.log(error)
          alert(error.response.data.message)
        }
    }

    const handleCourse=(e)=>{
        const {value,checked}=e.target;
        setCourse((prev)=>
            checked?[...prev,value]:prev.filter((course)=>course!==value)
        );
    };
  return (
      <div className="container">
        <h3>Create Emplyoee</h3>
        <div>
          <span>Name</span>
          <input type="text" value={name} onChange={(e)=>setName(e.target.value)} />
        </div>
        <div>
          <span>Email</span>
          <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div>
          <span>Mobile No</span>
          <input type="text" value={mobileNo} onChange={(e)=>setMobileNo(e.target.value)}/>
        </div>
        <div>
          <span>Designation</span>
          <select value={designation} onChange={(e)=>setDesignation(e.target.value)}>
            <option value="">Select</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>
        <div>
          <span>Gender</span>
          <label>
            <input type="radio" name="gender" value="M" checked={gender==='M'} onChange={(e)=>setGender(e.target.value)}/>
            Male
          </label>
          <label>
            <input type="radio" name="gender" value="F" checked={gender==='F'} onChange={(e)=>setGender(e.target.value)}/>
            Female
          </label>
        </div>
        <div>
          <span>Course</span>
          <label>
            <input type="checkbox" value="MCA" checked={course.includes('MCA')} onChange={handleCourse} />
            MCA
          </label>
          <label>
            <input type="checkbox" value="BCA" checked={course.includes('BCA')} onChange={handleCourse}/>
            BCA
          </label>
          <label>
            <input type="checkbox" value="BSC" checked={course.includes('BSC')} onChange={handleCourse}/>
            BSC
          </label>
        </div>
        <div>
          <span>Image</span>
          <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
        </div>
        <div>
            <button type="button" onClick={handleSubmit}>Submit</button>
        </div>
    </div>
  )
}

export default EmployeeAdd