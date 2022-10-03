import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <div>
        <div><Link to='/'>Home</Link></div>
       <div> <Link to='register'>Register</Link></div>
       <div><Link to='login'>Login</Link></div> 
       <div><Link to='product'>Product</Link></div> 
       <div><Link to='alluser'>All User</Link></div> 
       <div><Link to='admin'> Admin</Link></div> 
      
    </div>
  )
}

export default Navbar
