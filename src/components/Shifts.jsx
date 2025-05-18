import React from "react";
import ShiftsTable from "../external_comonets/shiftsTable/ShiftsTable";
import { useNavigate } from "react-router-dom";

function Shifts() {
  const shiftsData = [
    { name: "יוסי כהן", date: "2024-06-01", type: "Morning" },
    { name: "דנה לוי", date: "2024-06-01", type: "evning" },
    { name: "משה ישראלי", date: "2024-06-02", type: "Morning" },
    { name: "רונית ברק", date: "2024-06-02", type: "evning" },
    // ...אפשר להוסיף עוד...
  ];

  const navigate = useNavigate();

  return (
    <div className="shifts-page" style={{ width: "98%", margin: "0 auto" }}>
      <h2>ניהול שיבוצים</h2>
      <div
        style={{
          display: "flex",
          gap: "10px",
          margin: "20px 0",
          justifyContent: "flex-end",
        }}
      >
        <button className="btn add-btn" onClick={() => navigate("/add-shift")}>
          הוסף סידור
        </button>
      </div>
      <ShiftsTable data={shiftsData} />
    </div>
  );
}

export default Shifts;
