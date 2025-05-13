import React from 'react'
import Home from './Components/Home'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './Components/LandingPage'
import NavBar from './Components/NavBar'
import SignIn from './Components/Forms/SignInForm'
import SignUp from './Components/Forms/SignUpForm'



export default function Apps() {
  return (
    <>
    <NavBar/>
    <Routes>
      <Route path='/' element ={<LandingPage/>}/>
    <Route path='/home' element={<Home />}/>
    <Route path='/signin' element={<SignIn />}/>
    <Route path='/signup' element={<SignUp />}/>
    {/* <Route path='/about' element={<About />}/> */}
    {/* <Route path='/contact' element={<Contact />}/> */}
      {/* <Home /> */}
    </Routes>
    </>
  )
}

