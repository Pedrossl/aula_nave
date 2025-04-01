// Importando o Express, que é um framework web para Node.js usado para criar servidores HTTP
import express from "express";

// Importando o Knex, que é um query builder para bancos de dados SQL (MySQL, PostgreSQL, SQLite, etc.)
import knex from "knex";

// Criando uma instância do aplicativo Express
const app = express();

// Middleware do Express para permitir o parsing (leitura) de JSON no corpo das requisições
app.use(express.json());

// Definindo a porta onde o servidor vai rodar
const port = 3000;

// Criando a conexão com o banco de dados usando o Knex
// Aqui você deve substituir os dados de conexão com seu banco (host, usuário, senha, etc.)
const bancoDeDados = knex({
  client: "mysql2", // Cliente que será usado (poderia ser pg para PostgreSQL, sqlite3, etc.)
  connection: {
    host: "127.0.0.1", // Endereço do banco (localhost)
    port: 3306, // Porta padrão do MySQL
    user: "seu_usuario", // Usuário do banco
    password: "sua_senha", // Senha do banco
    database: "sua_database", // Nome do banco de dados
  },
});

// Rota raiz apenas para teste. Quando acessar http://localhost:3000/, verá "Hello World!"
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Rota para listar todos os tipos da tabela "tipos"
// Equivalente ao SQL: SELECT * FROM tipos;
app.get("/tipos", async (req, res) => {
  const tipos = await bancoDeDados.select("*").from("tipos");
  res.json(tipos); // Retorna os dados em formato JSON
});

// Rota para criar um novo tipo
// Espera um JSON como: { "nome": "Exemplo" }
// Equivalente ao SQL: INSERT INTO tipos(nome) VALUES ("Exemplo");
app.post("/tipo", async (req, res) => {
  const { nome } = req.body; // Desestruturando o campo "nome" do corpo da requisição
  const tipo = await bancoDeDados("tipos").insert({ nome }); // Inserindo no banco
  res.json(tipo); // Retorna o resultado (geralmente o ID do novo registro)
});

// Rota para buscar um tipo específico pelo ID
// Equivalente ao SQL: SELECT * FROM tipos WHERE id = :id;
app.get("/tipo/:id", async (req, res) => {
  const { id } = req.params; // Pegando o ID da URL
  const tipo = await bancoDeDados.select("*").from("tipos").where({ id });
  res.json(tipo); // Retorna o tipo correspondente
});

// Rota para listar todas as naves
// Equivalente ao SQL: SELECT * FROM naves;
app.get("/naves", async (req, res) => {
  const naves = await bancoDeDados.select("*").from("naves");
  res.json(naves); // Retorna todas as naves
});

// Rota para buscar uma nave específica pelo ID
// Equivalente ao SQL: SELECT * FROM naves WHERE id = :id;
app.get("/naves/:id", async (req, res) => {
  const { id } = req.params;
  const nave = await bancoDeDados("naves").select("*").where({ id });
  res.json(nave); // Retorna a nave encontrada
});

// Rota para deletar um tipo específico pelo ID
// Equivalente ao SQL: DELETE FROM tipos WHERE id = :id;
app.delete("/tipo/:id", async (req, res) => {
  const { id } = req.params;
  const tipo = await bancoDeDados("tipos").where({ id }).del();
  res.json(tipo); // Retorna quantos registros foram deletados
});

// Rota para criar uma nova nave
// Espera um JSON como: { "nome": "X-Wing", "cor": "Vermelha", "tipo_id": 1 }
// Equivalente ao SQL: INSERT INTO naves(nome, cor, tipo_id) VALUES ("X-Wing", "Vermelha", 1);
app.post("/nave", async (req, res) => {
  const { nome, cor, tipo_id } = req.body;
  const nave = await bancoDeDados("naves").insert({ nome, cor, tipo_id });
  res.json(nave); // Retorna o ID da nave criada
});

// Rota que retorna as naves com o nome do tipo associado
// Faz um JOIN entre a tabela naves e tipos
// Equivalente ao SQL:
// SELECT naves.*, tipos.nome AS tipoNome FROM naves JOIN tipos ON tipos.id = naves.tipo_id;
app.get("/naveTunada", async (req, res) => {
  const nave = await bancoDeDados("naves")
    .select("naves.*", "tipos.nome as tipoNome") // Seleciona todas as colunas de naves e o nome do tipo
    .join("tipos", "tipos.id", "=", "naves.tipo_id"); // Faz o JOIN com a tabela tipos
  res.json(nave); // Retorna a nave com o nome do tipo
});

// Inicia o servidor escutando na porta definida (3000)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
