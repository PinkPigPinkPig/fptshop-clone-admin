import React from "react"
import "./Footer.scss"
import { Typography } from "@mui/material"

export const Footer = () => {
  return (
    <div className="footer">
      <div
        className="license-text"
        style={{ fontSize: "14px", fontWeight: "bold" }}
      >
        <span>
          ĐỒ ÁN TỐT NGHIỆP - XÂY DỰNG WEBSITE BÁN ĐỒ ĐIỆN TỬ - SINH VIÊN{" "}
          <span className="text-danger"> NGUYỄN GIA LỘC </span> K17 - NĂM 2023
        </span>
      </div>
    </div>
  )
}
