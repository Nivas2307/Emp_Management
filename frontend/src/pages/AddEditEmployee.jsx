import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import BreadcrumbHeader from "../components/BreadcrumbHeader";

export default function AddEditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editing = Boolean(id);

  const [form, setForm] = useState({
    name: "",
    employee_id: "",
    department: "",
    designation: "",
    project: "",
    work_type: "",
    status: "",
  });

  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  useEffect(() => {
    if (editing) {
      api
        .get(`/api/employees/${id}`)
        .then((res) => {
          setForm(res.data);
          setPhotoPreview(
            res.data.photo
              ? res.data.photo.startsWith("http")
                ? res.data.photo
                : `http://localhost:5000/${res.data.photo}`
              : null
          );
        })
        .catch(() => alert("Failed to load employee"));
    }
  }, [id, editing]);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleFile = (e) => {
    const file = e.target.files[0];
    setPhotoFile(file);
    if (file) setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.keys(form).forEach((k) => data.append(k, form[k] || ""));
      if (photoFile) data.append("photo", photoFile);

      if (editing) {
        await api.put(`/api/employees/${id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        navigate(`/employees/${id}`);
      } else {
        await api.post("/api/employees", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        navigate("/employees");
      }
    } catch (err) {
      console.error(err);
      alert("Save failed");
    }
  };

  return (
    <div className="page form-page">
      <BreadcrumbHeader current={editing ? "Edit Employee" : "Add Employee"} />

      <form className="emp-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="file-col">
            <label className="photo-box">
              <input type="file" accept="image/*" onChange={handleFile} />
              {photoPreview ? (
                <img src={photoPreview} alt="pp" />
              ) : (
                <div className="photo-placeholder">+</div>
              )}
            </label>
          </div>

          <div className="fields-col">
            <label>
              Name*
              <input name="name" value={form.name} onChange={handleChange} />
            </label>
            <label>
              Employee ID*
              <input
                name="employee_id"
                value={form.employee_id}
                onChange={handleChange}
              />
            </label>
            <label>
              Department*
              <input
                name="department"
                value={form.department}
                onChange={handleChange}
              />
            </label>
            <label>
              Designation*
              <input
                name="designation"
                value={form.designation}
                onChange={handleChange}
              />
            </label>
            <label>
              Project
              <input
                name="project"
                value={form.project}
                onChange={handleChange}
              />
            </label>
            <label>
              Type
              <input
                name="work_type"
                value={form.work_type}
                onChange={handleChange}
              />
            </label>
            <label>
              Status
              <input
                name="status"
                value={form.status}
                onChange={handleChange}
              />
            </label>

            <div className="form-actions">
              <button
                type="button"
                className="btn"
                onClick={() => navigate("/employees")}
              >
                Cancel
              </button>
              <button type="submit" className="btn primary">
                {editing ? "Update" : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
