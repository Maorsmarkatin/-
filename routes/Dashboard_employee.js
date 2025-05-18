const dbSingleton = require("../dbSingleton");

const express = require("express");
const router = express.Router();

// Execute a query to the database
const db = dbSingleton.getConnection();

router.get("/", (req, res) => {
  const { name } = req.query;

  const query = `
    SELECT 
      task.id, 
      task.title, 
      task.status,
      users.name, 
      DATE_FORMAT(task.date, '%d/%m/%Y') AS date 
    FROM task
    JOIN users ON task.user_id = users.id
    WHERE users.name = ?;
  `;
  db.query(query, [name], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(results);
  });
});




module.exports = router;
