import express from "express";
import knex from "knex";
const app = express();
const port = 3000;
const bancoDeDados = knex({
  client: "mysql2",
  connection: {
    host: "127.0.0.1",
    port: 3306,
    user: "lobato",
    password: "root",
    database: "nave",
  },
});
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/tipos", (req, res) => {
  // SELECT * FROM tipos;
  const tipos = bancoDeDados.select("*").from("tipos");
  res.json(tipos);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
