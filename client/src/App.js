import './App.css'
import { Routes, Route } from 'react-router-dom'
import Menu from './pages/menu/menu'
import Signup from './pages/signup/signup'
import Login from './pages/login/login'
import { Navbar } from './components/navbar'
import Home from './pages/home/home'

function App() {
  const user = localStorage.getItem('token')
  return (
    <div>
      
         <Navbar />
        <Routes>
          <Route path='/' exact element={<Home/>}/>
          <Route path='/menu'></Route>
          {user && <Route path='/menu' exact element={<Menu/>}/>}
          <Route path='/signup' exact element={<Signup/>}/>
          <Route path='/login' exact element={<Login/>}/>
        </Routes>
      
      
    </div>
    
  )
}

export default App
