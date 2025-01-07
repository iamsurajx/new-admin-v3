import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar"; 
import Dashboard from "./components/Dashboard";
import AuthPage from "./components/AuthPage";
import ProtectedRoute from "./components/ProtectedRoute";
import InvestorCrud from "./pages/InvestorCrud";
import UpdateInvestor from "./pages/UpdateInvestor";
import CreateInvestor from "./pages/CreateInvestor";
import GetAllUsers from "./pages/GetAllUsers";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login state on page load by looking for a token in localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false); // Update the state to reflect that the user is logged out
  };

  return (
    <Router>
      <div className="flex">
        {/* Conditionally render the Sidebar only if the user is logged in */}
        {isLoggedIn && <Sidebar onSignOut={handleSignOut} />}
        
        <div className={`flex-1 min-h-screen ${isLoggedIn ? 'ml-64' : ''}`}>
          <Routes>
            {/* AuthPage route */}
            <Route
              path="/auth"
              element={<AuthPage setIsLoggedIn={setIsLoggedIn} />}
            />

            {/* Protected route for Dashboard */}
            <Route
              path="/dashboard"
              element={
                isLoggedIn ? (
                  <div>
                    <Dashboard />
                  </div>
                ) : (
                  <Navigate to="/auth" />
                )
              }
            />

            {/* Default route: Redirect to auth if not logged in */}
            <Route
              path="*"
              element={<Navigate to={isLoggedIn ? "/dashboard" : "/auth"} />}
            />

            {/* Other routes */}

            
            <Route path="/investors" element={<InvestorCrud />} />
            <Route path="/create-investor" element={<CreateInvestor />} />
            <Route path="api/update-investor/:id" element={<UpdateInvestor />} />
            <Route path="/users" element={<GetAllUsers />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
