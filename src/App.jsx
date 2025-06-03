import './App.css'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './Components/LandingPage'
import NavBar from './Components/NavBar'
import SignIn from './Components/Forms/SignInForm'
import SignUp from './Components/Forms/SignUpForm'
import UserDashboard from './Components/Users/UserDashboard'
import AboutUs from  './Components/AboutUs'
import Contact from './Components/Contact'
import Footer from './Components/Footer'
import NewLandingPage from './Components/NewLandingPage'

export default function Apps() {
  
  return (
    <>
    <NavBar/>
    <Routes>
      <Route path='/' element ={<LandingPage/>}/>
    <Route path='/login' element={<SignIn />}/>
    <Route path='/signup' element={<SignUp />}/>
    <Route path ='/users/:id/dashboard' element = {<UserDashboard/>}/>
    <Route path='/about' element={<AboutUs />}/>
    <Route path='/contact' element={<Contact />}/>
      <Route path='/home' element={<NewLandingPage/>}/>
    </Routes>
<Footer/>   
 </>
  )
}

