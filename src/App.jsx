import React from 'react'
// import Home from './Components/Home'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './Components/LandingPage'
import NavBar from './Components/NavBar'
import SignIn from './Components/Forms/SignInForm'
import SignUp from './Components/Forms/SignUpForm'
import UserDashboard from './Components/Users/UserDashboard'
import UserPodcastEntries from './Components/Users/UserPodcastEntries'
import AboutUs from  './Components/AboutUs'

export default function Apps() {
  return (
    <>
    <NavBar/>
    <Routes>
      <Route path='/' element ={<LandingPage/>}/>
    <Route path='/home' element={<UserPodcastEntries />}/>
    <Route path='/signin' element={<SignIn />}/>
    <Route path='/signup' element={<SignUp />}/>
    <Route path ='/users/:id/dashboard' element = {<UserDashboard/>}/>
    {/* <Route path = '/users/:user_id/podcastentries' element={<Home/>}/> */}
    <Route path='/about' element={<AboutUs />}/>
    {/* <Route path='/contact' element={<Contact />}/> */}
      {/* <Home /> */}
    </Routes>
    </>
  )
}

