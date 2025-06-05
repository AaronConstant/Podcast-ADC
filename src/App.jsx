import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import SignIn from "./Components/Forms/SignInForm";
import SignUp from "./Components/Forms/SignUpForm";
import AboutUs from "./Components/AboutUs";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";
import NewLandingPage from "./Components/NewLandingPage";
import UserDashboard from "./Components/Users/UserDashboard";

export default function Apps() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/users/:id/userdashboard" element={<UserDashboard />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/" element={<NewLandingPage />} />
      </Routes>
      <Footer />
    </>
  );
}
