const dbSingleton = require("../dbSingleton");

const express = require("express");
const router = express.Router();

// Execute a query to the database
const db = dbSingleton.getConnection();

router.get("/:id", (req, res) => {
  const orderId = req.params.id;
  const query = `
SELECT
  users.name AS UserName,
  shifts.shift_date AS ShiftDate,
  shifts.shift_type AS ShiftType,
  DATE_FORMAT(shifts_schedule.week_start_date, '%d/%m/%Y') AS WeekStartDate
FROM shifts
JOIN shifts_schedule ON shifts.schedule_id = shifts_schedule.id
JOIN users ON shifts.user_id = users.id
WHERE shifts_schedule.id = ?; 

  `;

  db.query(query, [orderId], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(results);
  });
});

router.post("/schedules", (req, res) => {
  const { week_start_date, shifts } = req.body;

  if (!week_start_date || !Array.isArray(shifts) || shifts.length === 0) {
    return res.status(400).json({ error: "Invalid request payload" });
  }

  db.beginTransaction((err) => {
    if (err) return res.status(500).json({ error: "Transaction error" });

    const scheduleQuery =
      "INSERT INTO Shifts_Schedule (week_start_date) VALUES (?)";
    db.query(scheduleQuery, [week_start_date], (err, result) => {
      if (err) {
        return db.rollback(() =>
          res.status(500).json({ error: "Failed to create schedule" })
        );
      }

      const scheduleId = result.insertId;

      const shiftValues = shifts.map((shift) => [
        scheduleId,
        shift.shift_date,
        shift.shift_type,
        shift.user_id,
      ]);
      const shiftQuery =
        "INSERT INTO Shifts (schedule_id, shift_date, shift_type, user_id) VALUES ?";

      db.query(shiftQuery, [shiftValues], (err) => {
        if (err) {
          return db.rollback(() =>
            res.status(500).json({ error: "Failed to create shifts" })
          );
        }

        db.commit((err) => {
          if (err) {
            return db.rollback(() =>
              res.status(500).json({ error: "Transaction commit failed" })
            );
          }

          res.status(201).json({
            message: "Schedule and shifts created successfully",
            scheduleId,
          });
        });
      });
    });
  });
});

module.exports = router;
