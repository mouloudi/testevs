const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let items = [];

app.get("/api/exams", (req, res) => {
  res.json(items);
});

app.post("/api/exams", (req, res) => {
  const item = req.body;
  items.push(item);
  res.status(201).json(item);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});