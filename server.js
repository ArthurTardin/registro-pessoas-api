const express = require("express");
const cors = require("cors");
const path = require("path");
const conexao = require("./db");

const app = express();

app.use(cors());
app.use(express.json());


app.get("/pessoas", (req, res) => {
  conexao.query("SELECT * FROM pessoas", (erro, resultado) => {
    if (erro) return res.status(500).json({ erro: erro.message });
    res.json(resultado);
  });
});

app.get("/pessoas/:id", (req, res) => {
  const { id } = req.params;
  conexao.query("SELECT * FROM pessoas WHERE id = ?", [id], (erro, resultado) => {
    if (erro) return res.status(500).json({ erro: erro.message });
    if (resultado.length === 0) return res.status(404).json({ mensagem: "Pessoa não encontrada" });
    res.json(resultado[0]);
  });
});

app.post("/pessoas", (req, res) => {
  const { nome, idade } = req.body;
  conexao.query("INSERT INTO pessoas (nome, idade) VALUES (?, ?)", [nome, idade], (erro, resultado) => {
    if (erro) return res.status(500).json({ erro: erro.message });
    res.status(201).json({ mensagem: "Pessoa cadastrada!", id: resultado.insertId });
  });
});

app.put("/pessoas/:id", (req, res) => {
  const { id } = req.params;
  const { nome, idade } = req.body;
  conexao.query("UPDATE pessoas SET nome = ?, idade = ? WHERE id = ?", [nome, idade, id], (erro, resultado) => {
    if (erro) return res.status(500).json({ erro: erro.message });
    if (resultado.affectedRows === 0) return res.status(404).json({ mensagem: "Pessoa não encontrada" });
    res.json({ mensagem: "Pessoa atualizada!" });
  });
});

app.delete("/pessoas/:id", (req, res) => {
  const { id } = req.params;
  conexao.query("DELETE FROM pessoas WHERE id = ?", [id], (erro, resultado) => {
    if (erro) return res.status(500).json({ erro: erro.message });
    if (resultado.affectedRows === 0) return res.status(404).json({ mensagem: "Pessoa não encontrada" });
    res.json({ mensagem: "Pessoa excluída!" });
  });
});


app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});