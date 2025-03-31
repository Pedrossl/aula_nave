import express from "express";
import knex from "knex";
const app = express();
app.use(express.json());
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

app.get("/tipos", async (req, res) => {
  // SELECT * FROM tipos;
  const tipos = await bancoDeDados.select("*").from("tipos");
  res.json(tipos);
});

app.post("/tipo", async (req, res) => {
  const { nome } = req.body;
  // INSERT INTO tipos(nome) VALUES ("Nome teste")
  const tipo = await bancoDeDados("tipos").insert({ nome });

  res.json(tipo);
});

app.get("/tipo/:id", async (req, res) => {
  const { id } = req.params;
  // SELECT * FROM tipos WHERE id = :id
  const tipo = await bancoDeDados.select("*").from("tipos").where({ id });
  res.json(tipo);
});

app.get("/naves", async (req, res) => {
  const { nave } = req.params;
  const naves = await bancoDeDados.select("*").from("naves");
  res.json(naves);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
