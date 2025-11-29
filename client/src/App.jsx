import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import ContactUs from "./components/ContactUs";
import Services from "./components/Services";
import Dashboard from "./components/Dashboard";
import Feedback from "./components/Feedback";
import UserProfile from "./components/UserProfile";
import UpdateUserProfile from "./components/UpdateUserProfile";
import Thank from "./components/Thank";
import Logout from "./components/Logout";
import SelectCity from "./components/SelectCity";
import ViewCities from "./components/ViewCities";
import History from "./components/History";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import Users from "./components/Users";
import Reports from "./components/Reports";
import AdminServices from "./components/AdminServices";
import Amenities from "./components/Amenities";
import Hospitals from "./components/Hospitals";
import ViewHospitals from "./components/ViewHospitals";
import ViewTourists from "./components/ViewTourists";
import Tourists from "./components/Tourists";
import Infrastructure from "./components/Infrastructure";
import ViewInfrastructure from "./components/ViewInfrastructure";
import UserInfrastructureView from "./components/UserInfrastructureView";
import UserTouristView from "./components/UserTouristView";
import UserHospitalView from "./components/UserHospitalView";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/Services" element={<Services />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Feedback" element={<Feedback />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/updateuserprofile" element={<UpdateUserProfile />} />
        
        <Route path="/Thank" element={<Thank />} />
        <Route path="/Logout" element={<Logout />} />
        <Route path="/SelectCity" element={<SelectCity />} />
        <Route path="/ViewCities" element={<ViewCities />} />
        <Route path="/History" element={<History />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/Users" element={<Users />} />
        <Route path="/Reports" element={<Reports />} />
        <Route path="/AdminServices" element={<AdminServices />} />
        <Route path="/Amenities" element={<Amenities />} />
        <Route path="/Hospitals" element={<Hospitals />} />
        <Route path="/ViewHospitals" element={<ViewHospitals />} />
        <Route path="/ViewTourists" element={<ViewTourists />} />
        <Route path="/Tourists" element={<Tourists />} />
        <Route path="/Infrastructure" element={<Infrastructure />} />
        <Route path="/ViewInfrastructure" element={<ViewInfrastructure />} />
        <Route path="/UserInfrastructureView" element={<UserInfrastructureView />} />
        <Route path="/UserTouristView" element={<UserTouristView />} />
        <Route path="/UserHospitalView" element={<UserHospitalView />} />

      </Routes>
    </Router>
  );
}

export default App;
