import React, { useEffect, useState } from 'react'
import axios from 'axios'

const AllUser = () => {
    // const token = localStorage.getItem('token')
    // console.log(token)
    const [user,setUser] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:5000/alluser',{
            headers:{
                "content-type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token")

            }
        }).then(respnse=>setUser([...respnse?.data?.data]))

    },[])

//    console.log(user)
   
  return (
    <div>
        <h1>hello this is a all user page</h1>
        <div>
            {user.length>0? user.map((item)=><li key={item.id}>
                <p>id: {item?.id}</p>
                <p>name: {item.name}</p>
            </li>):'there is no data'}
            
        </div>
      
    </div>
  )
}

export default AllUser



