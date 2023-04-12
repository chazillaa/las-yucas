import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar = () => {
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location = "/login";
      };
    return <div>
        <div className="links">
            <Link to='/'> <button>Home</button> </Link>
            <Link to='/menu'> <button>Menu</button> </Link>
            <Link to='/login'> <button>Login</button> </Link>
            <button onClick={handleLogout}>Logout</button>
        </div>
    </div>
}