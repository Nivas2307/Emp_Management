import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBell, FaCog, FaUserCircle } from "react-icons/fa";


export default function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="navbar">
     

      <div className="nav-right">
        {/* Notification */}
        <button className="icon-btn" title="Notifications">
          <FaBell />
        </button>

        {/* Settings */}
        <button className="icon-btn" title="Settings">
          <FaCog />
        </button>

        {/* Profile */}
        <button className="icon-btn" title="Profile" onClick={() => alert("Profile clicked!")}>
          <FaUserCircle />
        </button>
      </div>
    </header>
  );
}
