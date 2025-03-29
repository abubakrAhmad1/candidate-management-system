import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Navbar.css'

export default function Navbar() {
    return (
        <div className='main'>
            <div className='opt'><Link to="/add-new-candidate">Add New Candidate</Link></div>
            <div className='opt'><Link to="/existing-applications">Existing Applications</Link></div>
        </div>
    )
}
