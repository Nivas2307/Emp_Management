const db = require("../db");
const fs = require("fs");

// &create employee
exports.createEmployee = (req, res) => {
  const { name, employee_id, email, department, designation, project, work_type, status } = req.body;
  const photo = req.file ? req.file.path : null;

  const sql = `
    INSERT INTO employees
    (name, employee_id, email, department, designation, project, work_type, status, photo)
    VALUES (?,?,?,?,?,?,?,?,?)
  `;
  db.query(sql, [name, employee_id, email, department, designation, project, work_type, status, photo], (err, results) => {
    if (err) return res.status(500).json(err);
    res.status(201).json({ message: "Employee added successfully", id: results.insertId, photo: photo ? `http://localhost:5000/${photo}` : null });
  });
};

// *get all employee
exports.getEmployees = (req, res) => {
  db.query("SELECT *, CONCAT('http://localhost:5000/', photo) AS photoUrl FROM employees", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

// ? get employee by id
exports.getEmployeeById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT *, CONCAT('http://localhost:5000/', photo) AS photoUrl FROM employees WHERE id=?", [id], (err, results) => {
    if (err) return res.status(500).json(err);
    if (!results.length) return res.status(404).json({ message: "Employee not found" });
    res.json(results[0]);
  });
};

// ^update employee bye id
exports.updateEmployee = (req, res) => {
  const { id } = req.params;
  const { name, employee_id, email, department, designation, project, work_type, status } = req.body;
  const newPhoto = req.file ? req.file.path : null;

  db.query("SELECT * FROM employees WHERE id=?", [id], (err, results) => {
    if (err) return res.status(500).json(err);
    if (!results.length) return res.status(404).json({ message: "Employee not found" });

    const oldPhoto = results[0].photo;
    const photoToSave = newPhoto || oldPhoto;

    const sql = `
      UPDATE employees SET
      name=?, employee_id=?, email=?, department=?, designation=?, project=?, work_type=?, status=?, photo=?
      WHERE id=?
    `;
    db.query(sql, [name, employee_id, email, department, designation, project, work_type, status, photoToSave, id], (err2) => {
      if (err2) return res.status(500).json(err2);
      res.json({ message: "Employee updated successfully", photo: photoToSave ? `http://localhost:5000/${photoToSave}` : null });
    });
  });
};

//! delete employee by id
exports.deleteEmployee = (req, res) => {
  const { id } = req.params;

  db.query("SELECT photo FROM employees WHERE id=?", [id], (err, results) => {
    if (err) return res.status(500).json(err);
    if (!results.length) return res.status(404).json({ message: "Employee not found" });

    const photoPath = results[0].photo;
    if (photoPath && fs.existsSync(photoPath)) fs.unlinkSync(photoPath);

    db.query("DELETE FROM employees WHERE id=?", [id], (err2) => {
      if (err2) return res.status(500).json(err2);
      res.json({ message: "Employee deleted successfully" });
    });
  });
};
