const dbSingleton = require("../dbSingleton");

const express = require("express");
const router = express.Router();

// Execute a query to the database
const db = dbSingleton.getConnection();

router.get("/", (req, res) => {
  const query = `
    SELECT 
      id,
      Supplier_Name,
      Category,
      Product_Name,
      Price,
      Quantity,
      DATE_FORMAT(Expiration_Date, '%d/%m/%Y') AS Expiration_Date
    FROM products
  `;
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(results);
  });
});

router.post("/", (req, res) => {
  const {
    Supplier_Name,
    Category,
    Product_Name,
    Price,
    Quantity,
    Expiration_Date,
  } = req.body;

  const query =
    "INSERT INTO products (Supplier_Name, Category, Product_Name, Price, Quantity, Expiration_Date) VALUES (?, ?, ?, ?, ?, ?)";

  db.query(
    query,
    [Supplier_Name, Category, Product_Name, Price, Quantity, Expiration_Date],
    (err, results) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.json({ message: "Product added!", id: results.insertId });
    }
  );
});

// router.post("/orders", (req, res) => {
//   try {
//     const orderList = req.body;

//     if (!Array.isArray(orderList) || orderList.length === 0) {
//       return res.status(400).send("No products to update");
//     }

//     const values = orderList.map(({ id, stock }) => [id, stock]);

//     const query = `
//       INSERT INTO products (id, Quantity)
//       VALUES ?
//       ON DUPLICATE KEY UPDATE
//       Quantity = VALUES(Quantity) + products.Quantity;
//     `;

//     db.query(query, [values], (err, results) => {
//       if (err) {
//         return res.status(500).json({ message: "Update failed", error: err });
//       }
//       res.json({ message: "All products updated successfully!" });
//     });
//   } catch (error) {
//     res.status(500).json({ message: "An unexpected error occurred", error });
//   }
// });

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM products WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json({ message: "User deleted! " });
  });
});

module.exports = router;
