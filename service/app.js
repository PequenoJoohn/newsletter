const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3001;

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.sqlite");

app.use(bodyParser.json());
app.use(cors());

db.run(`
  CREATE TABLE IF NOT EXISTS emails (
    id INTEGER PRIMARY KEY,
    email TEXT
  )
`);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/address-send", (request, response) => {
  const email = request.body.email;

  db.run("INSERT INTO emails (email) VALUES (?)", [email], (err) => {
    if (err) {
      console.error("Erro ao inserir o email:", err);
      response.status(500).send("Erro ao salvar o email");
    } else {
      console.log("Email salvo:", email);
      response.status(200).send("Email received and saved");
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
