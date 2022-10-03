import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const navigate = useNavigate()
    const [user,setuser] =useState({
        name:'',
        email:'',
        password:''
    })
    const handleChange=(e)=>{
        setuser((prestate)=>({
            ...prestate,
            [e.target.name]:e.target.value
        }))
    }

    const handleClick=async(e)=>{
        e.preventDefault()
        if(user.name&&user.email&&user.password){
            const data = await axios.post('http://localhost:5000/newuser',user)
           console.log(data.data.msg)
           if(data.data.token){
            navigate('/login')
            
           }
         
      }
   
    }




  return (
    <div>
        <form action="">
        <input type="text" name='name' value={user.name} placeholder='enter name' onChange={handleChange}/> <br />
        <input type="text" name='email' value={user.email} placeholder='enter email' onChange={handleChange} /><br />
        <input type="text" name='password' value={user.password} placeholder='enter password' onChange={handleChange} /> <br />
        <button type='submit'  onClick={handleClick}>Register</button>

        </form>
      
    </div>
  )
}

export default Register
