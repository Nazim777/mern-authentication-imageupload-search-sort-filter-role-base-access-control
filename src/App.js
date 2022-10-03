import './App.css';
import Register from './component/Register';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Navbar from './component/Navbar';
import Login from './component/Login';
import Home from './component/Home';
import AllUser from './component/AllUser';
import Admin from './component/Admin';
import Product from './Pages/Product';
function App() {
  return (
    <div className="App">
      <h1>hello world</h1>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/register' element={<Register/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='alluser' element={<AllUser/>}/>
        <Route path='product' element={<Product/>}/>
        <Route path='admin' element={<Admin/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
