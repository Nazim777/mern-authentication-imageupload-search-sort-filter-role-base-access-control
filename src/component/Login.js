import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()

    const [user,setuser] =useState({
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
        if(user.email&&user.password){
            const data = await axios.post('http://localhost:5000/login',user)
           console.log(data.data.msg)
           if(data.data.token){
            localStorage.setItem('token',data.data.token)
            localStorage.setItem('id',data.data.id)
            navigate('/')
           }
         
      }
    
   
    }

  return (
    <div>

<div>
        <form action="">
        
        <input type="text" name='email' value={user.email} placeholder='enter email' onChange={handleChange} /><br />
        <input type="text" name='password' value={user.password} placeholder='enter password' onChange={handleChange} /> <br />
        <button type='submit'  onClick={handleClick}>Login</button>

        </form>
      
    </div>
      
    </div>
  )
}

export default Login
