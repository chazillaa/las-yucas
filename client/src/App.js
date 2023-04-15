import './App.css'
import { Routes, Route } from 'react-router-dom'
import Menu from './pages/menu/menu'
import Signup from './pages/signup/signup'
import Login from './pages/login/login'
import { Navbar } from './components/navbar'
import Home from './pages/home/home'
import Cart from './pages/cart/cart'
import React, { useState } from 'react';


function App() {
  const user = localStorage.getItem('token')
  const [cartCount, setCartCount] = useState(0);

  return (
    <div>
      <Navbar count={cartCount}/>
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/menu' exact element={<Menu setCount={setCartCount} 
        count={cartCount}
        />} />
        {user && <Route path='/cart' exact element={<Cart 
        setCount={setCartCount} 
        count={cartCount}
        />} />}
        {!user && <Route path='/signup' exact element={<Signup />} />}
        {!user && <Route path='/login' exact element={<Login />} />}
      </Routes>
    </div>
  )
}

export default App
