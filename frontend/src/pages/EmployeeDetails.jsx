import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import BreadcrumbHeader from "../components/BreadcrumbHeader";

export default function EmployeeDetails() {
  const { id } = useParams();
  const [emp, setEmp] = useState(null);

  useEffect(() => {
    api
      .get(`/api/employees/${id}`)
      .then((res) => setEmp(res.data))
      .catch(() => alert("Failed to load"));
  }, [id]);

  if (!emp) return <div className="page">Loading...</div>;

  const photoURL = emp.photo
    ? emp.photo.startsWith("http")
      ? emp.photo
      : `http://localhost:5000/${emp.photo}`
    : null;

  return (
    <div className="page details-page">
      <BreadcrumbHeader current="View Employee" />
      <div className="details-card">
        <div className="left">
          {photoURL ? (
            <img src={photoURL} alt={emp.name} />
          ) : (
            <div className="avatar-large">{emp.name?.[0]}</div>
          )}
        </div>

        <div className="right">
          <div className="row">
            <strong>Name</strong>
            <span>{emp.name}</span>
          </div>
          <div className="row">
            <strong>Employee ID</strong>
            <span>{emp.employee_id}</span>
          </div>
          <div className="row">
            <strong>Department</strong>
            <span>{emp.department}</span>
          </div>
          <div className="row">
            <strong>Designation</strong>
            <span>{emp.designation}</span>
          </div>
          <div className="row">
            <strong>Project</strong>
            <span>{emp.project}</span>
          </div>
          <div className="row">
            <strong>Type</strong>
            <span>{emp.work_type}</span>
          </div>
          <div className="row">
            <strong>Status</strong>
            <span>{emp.status}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
