import React,{useState,useEffect} from 'react'
import axios from 'axios'
import CreateUser from './AdminPage/CreateUser'
import UpdateUser from './AdminPage/UpdateUser'









const Admin = () => {
    const [user,setUser] = useState([])
    const [Id,setId] = useState('')
    const [msg,setMsg] =useState('')
    const [status,setStatus] = useState(false)
    const [searchValue,setSearchValue] = useState('')
    const [selectValue,setSelectValue] = useState('')
    useEffect(()=>{
       
       fetchData()

    },[])


    const fetchData = ()=>{
        axios.get('http://localhost:5000/adminalluser',{
            headers:{
                "content-type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token")

            }
        }).then(respnse=>setUser([...respnse?.data?.data]))
       }


    const hanldeDelte = async(id)=>{
        await axios.delete(`http://localhost:5000/deleteuser/${id}`,{
            headers:{
                "content-type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token")

            }

        }).then(Response=>{
            if(Response.data.msg){
                setMsg(Response.data.msg)
                setStatus(true)
            }
        })

    }



    const handleSearch = async(e)=>{
        e.preventDefault()

        axios.get(`http://localhost:5000/adminalluser?search=${searchValue}`,{
            headers:{
                "content-type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token")

            }
        }).then(respnse=>setUser([...respnse?.data?.data]))
        setSearchValue('')
    }


const handleReset = (e)=>{
    e.preventDefault()
    fetchData()
    
    
}

const handleSelect=async (e) =>{
    setSelectValue(e.target.value)
}

useEffect(()=>{
    
    axios.get(`http://localhost:5000/adminalluser?sort=${selectValue}&order=asc`,{
        headers:{
            "content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token")

        }
    }).then(respnse=>setUser([...respnse?.data?.data]))

},[selectValue])
// console.log(msg)
if(status){
    return<Admin/>
}
  return (
    <div>
        <h1>hello this is a admin page</h1>
        <div>
            <h1>create more user</h1>
            <CreateUser setStatus={setStatus}/>

        </div>
        <div>
            <h1>update user</h1>
            <UpdateUser id={Id} data= {user} setStatus={setStatus}/>
        </div>
        <div>
           
            <div style={{display:'flex', justifyContent:'space-evenly'}}>
                <div>
                <h1>search user</h1>
                <form action="">
                    <input type="text" name='name' value={searchValue} onChange={(e)=>setSearchValue(e.target.value)}  placeholder='search by name...'/>
                    <br />
                    <button type='submit' onClick={handleSearch}>search</button>
                    <button type='submit' onClick={handleReset}>reset</button>
                </form>
                </div>

                <div>
                <h1>sort user</h1>
                <select  value={selectValue} onChange={handleSelect}>
                    <option value="">please select option</option>
                    <option value="name">name</option>
                    <option value="email">email</option>
                   
                </select>
                </div>
            </div>
            <h1>all user</h1>
            {user.length>0? user.map((item)=><li key={item.id}>
                <p>id: {item.id}</p>
                <p>name: {item.name}</p>
                <p>email: {item.email}</p>
                <p>password: {item.password}</p>
                <button onClick={()=>setId(item.id)}>edit</button>
                <button onClick={()=>hanldeDelte(item.id)}>delete</button>
                
            </li>):'there is no data'}
            
        </div>

      
    </div>
  )
}

export default Admin
