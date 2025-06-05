import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import SignIn from "./Components/Forms/SignInForm";
import SignUp from "./Components/Forms/SignUpForm";
// import UserDashboard from "./Components/Users/UserDashboard";
import AboutUs from "./Components/AboutUs";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";
import NewLandingPage from "./Components/NewLandingPage";
// import NewUserDashboard from './Components/Users/NewUserDashboard'
import MockDashboard from './Components/Users/MockDashboard'

export default function Apps() {

  return (
    <>
      <NavBar />
      <Routes>
        < Route path='/users/:id/mockdashboard'element={<MockDashboard/>}/>
        {/* <Route path="/users/:id/userdashboard" element={<NewUserDashboard />} /> */}
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        {/* <Route path="/users/:id/dashboard" element={<UserDashboard />} /> */}
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/" element={<NewLandingPage />} />
      </Routes>
      <Footer />
    </>
  );
}
