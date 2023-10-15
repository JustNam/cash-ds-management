import React from "react";
import LoginPage from "./pages/Login"
import HomePage from "./HomePage";
import UserManagement from "./pages/UserManagement";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedAdminRoute, ProtectedRoute } from "./pages/ProtectedRoute";
import { AuthProvider } from "./hooks/useAuth";


function App() {
  return (

    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="login" element={<LoginPage/>}/>
          <Route path="/" element={<ProtectedRoute><HomePage/></ProtectedRoute>}/>
          <Route path="usersManagement" element={<ProtectedRoute type={"admin"}><UserManagement/></ProtectedRoute>}/>
        </Routes>
      </AuthProvider>
    </BrowserRouter>

  );
}

export default App;
