import React from "react";
import { FaRegEye, FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function EmployeeCard({ emp, onDelete }) {
  const navigate = useNavigate();
  const empId = emp?.id || emp?._id;

  const getPhotoURL = (photo) =>
    photo
      ? photo.startsWith("http")
        ? photo
        : `http://localhost:5000/${photo}`
      : null;

  const photoURL = getPhotoURL(emp?.photo);

  return (
    <tr>
      <td className="td-photo">
        {photoURL ? (
          <img src={photoURL} alt={emp?.name || "Employee"} />
        ) : (
          <div
            className="avatar-placeholder"
            aria-label={emp?.name || "Employee"}
          >
            {emp?.name?.[0]?.toUpperCase() || "?"}
          </div>
        )}
      </td>

      <td>{emp?.name || "-"}</td>
      <td>{emp?.employee_id || "-"}</td>
      <td>{emp?.department || "-"}</td>
      <td>{emp?.designation || "-"}</td>
      <td>{emp?.project || "-"}</td>
      <td>{emp?.work_type || "-"}</td>
      <td>{emp?.status || "-"}</td>

     <td className="actions">
        <div
          type="button"
          className="action-btn view  action-icon"
          title="View"
          onClick={() => navigate(`/employees/${empId}`)}
        >
          <FaRegEye />
        </div>

        <div
          type="button"
          className="action-btn edit  action-icon"
          title="Edit"
          onClick={() => navigate(`/employees/edit/${empId}`)}
        >
          <FaEdit />
        </div>

        <div
          type="button"
          className="action-btn delete action-icon"
          title="Delete"
          onClick={() => onDelete(empId)}
        >
          <FaTrash />
        </div>
      </td>
    </tr>
  );
}
