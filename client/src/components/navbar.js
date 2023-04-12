import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar = () => {
    return <div>
        <div className="links">
            <Link to='/login'> Login </Link>
            <Link to='/'> Home </Link>
        </div>
    </div>
}