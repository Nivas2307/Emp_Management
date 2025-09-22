import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaPlus } from "react-icons/fa";
import api from "../api";
import EmployeeCard from "../components/EmployeeCard";
import ConfirmModal from "../components/ConfirmModal";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/employees");
      setEmployees(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const requestDelete = (id) => {
    setDeleteId(id);
    setModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/api/employees/${deleteId}`);
      setEmployees((prev) =>
        prev.filter((e) => e.id !== deleteId && e._id !== deleteId)
      );
      setModalOpen(false);
      setDeleteId(null);
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  const filteredEmployees = employees.filter((emp) => {
    const term = searchTerm.toLowerCase();
    return (
      emp.name?.toLowerCase().includes(term) ||
      emp.employee_id?.toLowerCase().includes(term) ||
      emp.department?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="page">
      <div className="page-header">
        <h2
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/employees")}
        >
          Employee
        </h2>

        <div className="employee-controls">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button
            className="btn primary add-btn"
            onClick={() => navigate("/employees/add")}
          >
            <FaPlus /> Add Employee
          </button>
        </div>
      </div>

      <div className="table-wrap">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <table className="emp-table">
            <thead>
              <tr>
                <th></th>
                <th>Employee Name</th>
                <th>Employee ID</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Project</th>
                <th>Type</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.length === 0 && (
                <tr>
                  <td colSpan={9} className="empty">
                    No employees found
                  </td>
                </tr>
              )}
              {filteredEmployees.map((emp) => (
                <EmployeeCard
                  key={emp.id || emp._id}
                  emp={emp}
                  onDelete={requestDelete}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>

      <ConfirmModal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onConfirm={confirmDelete}
        title="Are you sure you want to delete this employee?"
      />
    </div>
  );
}
