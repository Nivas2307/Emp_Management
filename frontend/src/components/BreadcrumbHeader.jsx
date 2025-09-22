import React from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

export default function BreadcrumbHeader({ current }) {
  const navigate = useNavigate();

  return (
    <div className="breadcrumb-header" style={breadcrumbStyle}>
      <span
        onClick={() => navigate("/employees")}
        style={backStyle}
      >
    <IoIosArrowBack style={{ marginRight: "5px" }} /> 
      </span>
      <span > {current}</span>
    </div>
  );
}

const breadcrumbStyle = {
  display: "flex",
  alignItems: "center",
  fontSize: "18px",
  marginBottom: "20px",
};

const backStyle = {
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  fontWeight: 500,
};

