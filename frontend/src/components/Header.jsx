import React from "react";

export default function Header({ search, setSearch, onAdd }) {
  return (
    <div className="header">
      <h2>Employee Management</h2>
      <div className="search-add">
        <input
          type="text"
          placeholder="Search Employee..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={onAdd}>Add Employee</button>
      </div>
    </div>
  );
}
