// import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css";
// import Navbar from './components/Navbar';
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import Signup from "./components/Signup";
import LoginPage from "./components/Login";
import Postjob from "./components/Postjob";
import Joblist from "./components/Joblist";
import Help from "./components/Help";
import Details from "./components/Details";
import { useState } from "react";
import myContext from "./components/ContextProvider";
function App() {
  const [userId, setUserId] = useState(null);
  const [admin, setAdmin] = useState(false);
  const [jobIdApp, setJobIdApp] = useState(null);
  return (
    <myContext.Provider
      value={{ userId, setUserId, admin, setAdmin, jobIdApp, setJobIdApp }}
    >
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/postjob" element={<Postjob />}></Route>
        <Route path="/joblist" element={<Joblist />}></Route>
        <Route path="/help" element={<Help />}></Route>
        <Route path="/details" element={<Details />}></Route>
      </Routes>
    </myContext.Provider>
  );
}

export default App;
