import { AppBar } from '@mui/material'
import React from 'react'
import '../Styling/NavbarStyling.scss'

export default function NavBar() {
  return (
    <AppBar position="static">
      <div className="nav-bar">
        <h1>My App</h1>
        <nav>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Contact</li>
          </ul>
        </nav>
      </div>
    </AppBar>
  )
}
