import './App.css'
import { Routes, Route } from 'react-router-dom'
import Menu from './pages/menu/menu'
import Signup from './pages/signup/signup'
import Login from './pages/login/login'
import { Navbar } from './components/navbar'
import Home from './pages/home/home'
import Cart from './pages/cart/cart'

function App() {
  const user = localStorage.getItem('token')

  return (
    <div>
         <Navbar />
        <Routes>
          <Route path='/' exact element={<Home/>}/>
          <Route path='/menu' exact element={<Menu/>}/>
          {user && <Route path='/cart' exact element={<Cart/>}/>}
          {!user && <Route path='/signup' exact element={<Signup/>}/>}
          {!user && <Route path='/login' exact element={<Login/>}/>}
        </Routes>
    </div>
  )
}

export default App
