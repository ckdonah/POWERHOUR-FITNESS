import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Programs from "./components/Programs/Programs";
import Trainers from "./components/Trainers/Trainers";
import Offers from "./components/Offers/Offers";
import Testimonials from "./components/Testimonials/Testimonials";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import SignUp from "./components/JoinUs/Signup/Signup";
import Login from "./components/JoinUs/Login/Login";
import AdminDashboard from "./components/RoleBasedDashboard/AdminDashboard";
import TrainerDashboard from "./components/RoleBasedDashboard/TrainerDashboard";
import MemberDashboard from "./components/RoleBasedDashboard/MemberDashboard";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import "./App.css";

import Yoga from "./components/Programs/yoga/Yoga.jsx";
import YogaCourses from "./components/Programs/yoga/yoga-courses/YogaCourses.jsx";
import Cardio from "./components/Programs/cardio/Cardio.jsx";
import PilatesCourses from "./components/Programs/pilates/pilates-courses/PilatesCourses.jsx";
import Pilates from "./components/Programs/pilates/Pilates.jsx";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Header />
                <Hero />
                <Programs />
                <Trainers />
                <Offers />
                <Testimonials />
                <Contact />
                <Footer />
              </div>
            }
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/trainer"
            element={
              <ProtectedRoute role="trainer">
                <TrainerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/member"
            element={
              <ProtectedRoute role="member">
                <MemberDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/programs/yoga" element={<Yoga />} />
          <Route path="/programs/yoga/yoga-courses" element={<YogaCourses />} />

          <Route path="/programs/cardio" element={<Cardio />} />
          <Route path="/programs/cardio/cardio-courses" element={<Cardio />} />
          
          <Route path="/programs/pilates" element={<Pilates />} />
          <Route path="/programs/pilates/pilates-courses" element={<PilatesCourses />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
