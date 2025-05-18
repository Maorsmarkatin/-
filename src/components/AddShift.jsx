import React from "react";
import ShiftsTable from "../external_comonets/shiftsTable/ShiftsTable";

// רשימת העובדים לבחירה
// const employees = ["יוסי כהן", "דנה לוי", "משה ישראלי", "רונית ברק"];

const employees = [
  {
    id: 1,
    name: "Alice Cohen",
  },
  {
    id: 2,
    name: "Bob Levi",
  },
  {
    id: 3,
    name: "Charlie Mizrahi",
  },
];
// const [nameList, setNameList] = useState([]);

// useEffect(() => {
//   fetchNameList();
// }, []);

// const fetchNameList = () => {
//   axios
//     .get("users/name")
//     .then((res) => {
//       setNameList(res.data);
//     })
//     .catch((error) => {
//       console.error("Error fetching users:", error);
//     });
// };

// יצירת מערך של 14 משמרות - 7 ימים כפול 2 משמרות (בוקר וערב)
const shifts = [];
const startDate = new Date("2024-06-01");
for (let i = 0; i < 7; i++) {
  const date = new Date(startDate);
  date.setDate(startDate.getDate() + i);
  const dateStr = date.toISOString().slice(0, 10); // תאריך בפורמט YYYY-MM-DD
  shifts.push({ date: dateStr, type: "בוקר" }); // מוסיף משמרת בוקר
  shifts.push({ date: dateStr, type: "ערב" }); // מוסיף משמרת ערב
}

export default function AddShift() {
  const handleSave = () => {
    // לוקח את כל תיבות הבחירה מהדום
    const selects = document.querySelectorAll("select");

    // יוצר מערך של אובייקטים שמכילים תאריך, סוג, ו-id העובד שנבחר
    const result = Array.from(selects).map((sel, idx) => ({
      shift_date: shifts[idx].date,
      shift_type: shifts[idx].type,
      user_id: sel.value,
    }));

    // בודק אם כל המשמרות אוישו (כל תיבה נבחרה)
    const allSelected = result.every((r) => r.user_id);
    if (!allSelected) {
      alert("יש לבחור עובד לכל משמרת לפני שמירה.");
      return;
    }

    // מדפיס את התוצאה בפורמט נוח לקריאה
    alert(JSON.stringify(result, null, 2));
  };

  return (
    <div style={{ padding: "20px", direction: "rtl" }}>
      <h2>סידור משמרות</h2>
      <div className="shifts-table-container">
        <table className="shifts-table">
          <thead>
            <tr>
              <th>שם עובד</th>
              <th>תאריך</th>
              <th>סוג משמרת</th>
            </tr>
          </thead>
          <tbody>
            {shifts.map((shift, idx) => (
              <tr key={idx}>
                <td>
                  {/* תיבת בחירה עבור כל משמרת */}
                  <select defaultValue="">
                    <option value="">בחר עובד</option>
                    {employees.map((emp, i) => (
                      <option key={i} value={emp.id}>
                        {emp.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td>{shift.date}</td>
                <td>{shift.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: "20px", textAlign: "left" }}>
        {/* כפתור לשמירת הסידור */}
        <button className="save-btn" onClick={handleSave}>
          שמור סידור
        </button>
      </div>
    </div>
  );
}
