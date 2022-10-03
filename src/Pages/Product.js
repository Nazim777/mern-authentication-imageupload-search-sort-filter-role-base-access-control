import React,{useState,useEffect} from 'react'
import axios from 'axios'

const GetAllPost = ()=>{
  const [post,setPost] = useState([])
  useEffect(()=>{
    const fetchPost = async()=>{
      try {
        const data = await axios.get('http://localhost:5000/getallpost')
      setPost([...data.data])
      } catch (error) {
        console.log(error)
        
      }
    }

   fetchPost()
  },[])
// console.log(post)
  return(
    <div>
      {
        post&& post.map((item)=><li key={item.id}>
          <p> title: {item.title}</p>
          <p> description: {item.description}</p>
          <div>
            <img src={item.image.url} alt="" style={{width:'100%',height:'auto',maxWidth:'400px'}} />
          </div>

        </li>)
      }

    </div>
  )
}


const init ={
  title:'',
  description:''
}
const Product = () => {
    const [user,setuser] =useState(init)
    const [postImage,setPostImage] = useState('')
    const [status,setStatus] = useState(false)
    const handleChange=(e)=>{
        setuser((prestate)=>({
            ...prestate,
            [e.target.name]:e.target.value
        }))
    }

    const handleImage = (e)=>{
     const file = e.target.files[0]
     TransformFileData(file);

    }


    const TransformFileData = (file) => {
        const reader = new FileReader();
    
        if (file) {
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            setPostImage(reader.result);
          };
        } else {
          setPostImage("");
        }
      };




      
    const handleClick=async(e)=>{
        e.preventDefault()
        if(user.title&&user.description&&postImage){
            const data = await axios.post(`http://localhost:5000/createpost/${localStorage.getItem('id')}`,{...user,image:postImage})
           console.log(data.data.msg)
           setuser(init)
           setPostImage('')
           setStatus(true)
         
      }
    
   
    }

    if(status){
      return <Product/>
    }

  return (
    <div>
       <div style={{display:'flex',justifyContent:'space-around'}}>
              <div>
                  <form action="">
                  <input type="text" name='title' value={user.title} placeholder='enter title' onChange={handleChange}/> <br />
                  <input type="text" name='description' value={user.description} placeholder='enter desc....' onChange={handleChange} /><br />
                  <input type="file" accept='image/' name='image' value={user.password} onChange={handleImage} /> <br />
                  <button type='submit'  onClick={handleClick}>Register</button>

                  </form>

              </div>
              <div>
                {
                  postImage?
                  <img src={postImage} alt="" style={{width:'100%',height:'auto',maxWidth:'400px'}}/> : (
                    <p>Product image upload preview will appear here!</p>
                  )
                }

              </div>
       </div>
       <GetAllPost/>
      
    </div>
  )
}

export default Product
