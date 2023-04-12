import React, { useEffect, useState  } from 'react'
import { Link } from 'react-router-dom'

export const Navbar = () => {
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location = "/login";
      };

    const [isLogged, showIsLogged ] = useState(false)

    useEffect(() => {
        checkStorage()
        return () => {}
    }, [isLogged])
    function checkStorage() {
        if (localStorage.getItem('token')) {
            showIsLogged(true)
        } else {
            showIsLogged(false)
        }
    }

    return <div>
        <div className="links">
            <Link to='/'> <button className='btn btn-success mb-5'>Home</button> </Link>
            <Link to='/menu'> <button className='btn btn-success mb-5'>Menu</button> </Link>
            {!isLogged ? (
                <Link to='/login'> <button className='btn btn-success mb-5'>Login</button> </Link>
            ) : ( <button className='btn btn-success mb-5' onClick={handleLogout}>Logout</button> )}
            
            
        </div>
    </div>
}