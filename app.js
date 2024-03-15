const express = require('express');
const cors = require('cors');
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(cors({
  origin: 'http://localhost:4200' 
}));

function readJsonFileSync(filepath, encoding) {
  if (typeof encoding === "undefined") {
    encoding = "utf8";
  }
  const file = fs.readFileSync(filepath, encoding);
  return JSON.parse(file);
}

function getPaginatedData(page, pageSize, data) {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return data.slice(startIndex, endIndex);
}

let mockData = readJsonFileSync("./mock.json");

app.get("/totalEmployees", (req, res) => {
  res.send({totalEmployees: mockData.Employees.length });
});

app.get("/users", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = 10;
  const paginatedData = getPaginatedData(page, pageSize, mockData.Employees);
  res.json(paginatedData);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
