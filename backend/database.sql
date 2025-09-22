-- !Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS employeedb;

-- ~Use the database
USE employeedb;

-- ^Create employees table
CREATE TABLE IF NOT EXISTS employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    department VARCHAR(100),
    designation VARCHAR(100),
    project VARCHAR(100),
    work_type ENUM('Office','Remote','Hybrid') DEFAULT 'Office',
    status ENUM('Permanent','Temporary','Intern') DEFAULT 'Permanent',
    photo VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ? Optional: check table structure
DESCRIBE employees;

-- *Optional: view all data
SELECT * FROM employees;
