import React from "react";
import { FaEye, FaTrash, FaEdit } from "react-icons/fa";
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
        <button
          type="button"
          className="action-btn view"
          title="View"
          onClick={() => navigate(`/employees/${empId}`)}
        >
          <FaEye />
        </button>

        <button
          type="button"
          className="action-btn edit"
          title="Edit"
          onClick={() => navigate(`/employees/edit/${empId}`)}
        >
          <FaEdit />
        </button>

        <button
          type="button"
          className="action-btn delete"
          title="Delete"
          onClick={() => onDelete(empId)}
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}
