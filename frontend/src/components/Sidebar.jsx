import React from "react";
import { NavLink } from "react-router-dom";
import { FaUsers, FaCalendarAlt, FaEnvelope } from "react-icons/fa";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">RS-TECH</div>
      <nav>
        <NavLink
          to="/employees"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <FaUsers style={{ marginRight: "8px" }} />
          Employee
        </NavLink>

        <a className="disabled">
          <FaCalendarAlt style={{ marginRight: "8px" }} />
          Calendar
        </a>

        <a className="disabled">
          <FaEnvelope style={{ marginRight: "8px" }} />
          Messages
        </a>
      </nav>
    </aside>
  );
}
