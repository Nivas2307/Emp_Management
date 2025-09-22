import React from "react";
import { FaTrash } from "react-icons/fa";

export default function ConfirmModal({
  open,
  title = "Are you sure?",
  onCancel,
  onConfirm,
}) {
  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-icon">
          <FaTrash size={40} color="#d9534f" /> 
        </div>
        <h3>{title}</h3>
        <div className="modal-actions">
          <button className="btn" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn danger" onClick={onConfirm}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}
