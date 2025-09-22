import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import EmployeeList from "./pages/EmployeeList";
import AddEditEmployee from "./pages/AddEditEmployee";
import EmployeeDetails from "./pages/EmployeeDetails";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import "./App.css";

export default function App() {
  return (
    <div className="app-root">
      <Sidebar />
      <div className="main-area">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Navigate to="/employees" />} />
            <Route path="/employees" element={<EmployeeList />} />
            <Route path="/employees/add" element={<AddEditEmployee />} />
            <Route path="/employees/edit/:id" element={<AddEditEmployee />} />
            <Route path="/employees/:id" element={<EmployeeDetails />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
