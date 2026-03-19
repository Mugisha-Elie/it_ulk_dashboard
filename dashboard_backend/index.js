import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mysql from "mysql2";

dotenv.config();

const app = express();

const port = 5000;

const password = process.env.DB_PASSWORD;
const user = process.env.DB_USER;
const host = process.env.DB_HOST;
const database = process.env.DB_NAME;

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({ host, user, password, database });
db.connect((error) => {
  if (error) {
    console.log("Error Connecting to the database", error);
    return;
  }

  console.log("Connection Successful");
});

app.get("/api/assets", (req, res) => {
  const sql = `
        SELECT 
            a.id, 
            a.product_name AS product, 
            c.name AS category, 
            v.companyName AS supplier, 
            a.stock_quantity AS stock, 
            a.min_threshold AS min
        FROM assets a
        JOIN categories c ON a.category_id = c.id
        JOIN vendors v ON a.vendor_id = v.id
    `;

  db.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database query failed" });
    }

    res.json(results);
  });
});

app.post("/api/assets", (req, res) => {
  const {
    product_name,
    category_id,
    vendor_id,
    stock_quantity,
    min_threshold,
  } = req.body;

  const sql =
    "INSERT INTO assets (product_name, category_id, vendor_id, stock_quantity, min_threshold) VALUES (?, ?, ?, ?, ?)";

  db.query(
    sql,
    [product_name, category_id, vendor_id, stock_quantity, min_threshold],
    (err, result) => {
      if (err) {
        console.log("Error adding new asset", err);
        return res.status(500).json({ error: "Database Insert Failed" });
      }

      return res.json({ success: true, id: result.insertId });
    },
  );
});

app.get("/api/vendors", (req, res) => {
  db.query("SELECT id, companyName FROM vendors order by companyName asc", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

app.post("/api/vendors", (req, res) => {
    const {companyName, email} = req.body;
    const sql = "INSERT INTO vendors (companyName, email) VALUES (?, ?)";

    db.query(sql, [companyName, email], (err, result) => {
        if(err){
            console.error(err);
            return res.status(500).json({error: err.message})
        }

        return res.json({success: true, id: result.insertId})
    })


})

app.get("/api/categories", (req, res) => {
    const sql = "Select id, name from categories order by name asc"
    db.query(sql, (err, result) => {
        if(err) return res.status(500).json(err)
        return res.json(result);
    })
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
