import React,{useState,useEffect} from "react";
import axios from "axios";


const UpdateUser = ({id,data,setStatus})=>{

    const [user,setuser] =useState({
        name:'',
        email:'',
        password:''
    })

    useEffect(()=>{
        const filterUser = data?.find((item)=>item.id==id)
       if(filterUser){
        setuser({
            name:filterUser.name,
            email:filterUser.email,
            password:filterUser.password
        })
       }

    },[id])
    const handleChange=(e)=>{
        setuser((prestate)=>({
            ...prestate,
            [e.target.name]:e.target.value
        }))
    }
    const handleClick=async(e)=>{
        e.preventDefault()
        if(user.name&&user.email&&user.password){
            const data = await axios.put(`http://localhost:5000/updateuser/${id}`,user,{
                headers:{
                    "content-type": "application/json",
                  Authorization: "Bearer " + localStorage.getItem("token")
    
                }

            })
           console.log(data.data.msg)
           setStatus(true)
           
           
         
      }
    
   
    }



    return(
        <div>
        <form action="">
        <input type="text" name='name' value={user.name} placeholder='enter name' onChange={handleChange}/> <br />
        <input type="text" name='email' value={user.email} placeholder='enter email' onChange={handleChange} /><br />
        <input type="text" name='password' value={user.password} placeholder='enter password' onChange={handleChange} /> <br />
        <button type='submit'  onClick={handleClick}>update user</button>

        </form>
      
    </div>


    )
}


export default UpdateUser