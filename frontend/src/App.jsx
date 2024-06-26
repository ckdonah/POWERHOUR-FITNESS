import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Programs from "./components/Programs/Programs";
import Program from "./components/Programs/Program";
import Course from "./components/Programs/Course";
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
import UpdateProfilePic from "./components/UpdateProfilePic/UpdateProfilePic.jsx";
import ManageBookings from "./components/Managebookings/ManageBookings.jsx";
import BookProgram from "./components/Managebookings/BookProgram.jsx";
import UpdateBooking from "./components/Managebookings/UpdateBookings.jsx";

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import UpdateProfile from "./components/UpdateProfile/UpdateProfile";
import WriteReview from "./components/Review/WriteReview";
import { AuthProvider } from "./contexts/AuthContext";
import "./App.css";

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
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
            <Route
              path="/manage-bookings"
              element={
                <ProtectedRoute role="member">
                  <ManageBookings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/update-profile-pic"
              element={
                <ProtectedRoute role="member">
                  <UpdateProfilePic />
                </ProtectedRoute>
              }
            />
            <Route
              path="/update-profile"
              element={
                <ProtectedRoute role="member">
                  <UpdateProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/write-review"
              element={
                <ProtectedRoute role="member">
                  <WriteReview />
                </ProtectedRoute>
              }
            />
            <Route
              path="/write-review/:id"
              element={
                <ProtectedRoute role="member">
                  <WriteReview />
                </ProtectedRoute>
              }
            />
            <Route
              path="/book-program"
              element={
                <ProtectedRoute role="member">
                  <BookProgram />
                </ProtectedRoute>
              }
            />
            <Route
              path="/update-booking/:id"
              element={
                <ProtectedRoute role="member">
                  <UpdateBooking />
                </ProtectedRoute>
              }
            />
            <Route path="/programs">
              <Route
                path=":program/:course/:trainer/:id/*"
                element={<Course />}
              />
              <Route path=":program/*" element={<Program />} />
              <Route path="" element={<Programs />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace={true} />} />
          </Routes>
        </AuthProvider>
      </Router>
    </SnackbarProvider>
  );
}

export default App;
