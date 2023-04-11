import './App.css'
import { Route, Routes } from 'react-router-dom'
import Menu from './components/Menu'
import Signup from './components/Signup'
import Login from './components/Login'

function App() {
  const user = localStorage.getItem('token')
  return (
    <div>
      <Routes>
      {user && <Route path='/main' exact element={<Menu/>}/>}
      <Route path='/signup' exact element={<Signup/>}/>
      <Route path='/login' exact element={<Login/>}/>
    </Routes>
    </div>
    
  )
}

export default App
