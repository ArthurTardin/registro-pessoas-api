# Front-End – Sistema de Gestão de Pessoas

**Atividade 08 – Consumindo o Back-End no Front-End – CRUD Completo**

**Professor:** Vitor Lima Santana  
**Aluno(a):** Arthur Tardin  
**Disciplina:** Programação Back-End

## 1. Objetivo

Desenvolver uma aplicação web full-stack simples integrando Front-End (HTML5, CSS3 e JavaScript nativo) a uma API RESTful desenvolvida em Node.js, Express e MySQL.

A atividade tem como foco realizar a integração via requisições assíncronas utilizando a `Fetch API`, métodos HTTP (**GET**, **POST**, **PUT**, **DELETE**), manipuladores de eventos do DOM e tratamento rigoroso de erros com `async/await` e `try/catch`.

---

## 2. Tecnologias utilizadas

- **Front-End:** HTML5, CSS3, JavaScript (ES6+), Fetch API
- **Back-End:** Node.js, Express.js, CORS, dotenv
- **Banco de Dados:** MySQL / MariaDB (`mysql2`)
- **Arquitetura:** Servidor único entregando arquivos estáticos e endpoints da API

---

## 3. Estrutura do projeto

```text
meu-projeto/
├── .env                  # Configurações de conexão do MySQL
├── db.js                 # Conexão com o banco de dados via mysql2
├── index.js              # Servidor Express, endpoints da API e suporte a arquivos estáticos
├── package.json          # Dependências do Node.js
└── public/               # Pasta de arquivos públicos estáticos (Front-End)
    ├── index.html        # Estrutura HTML da interface (SPA)
    ├── style.css         # Estilização da aplicação
    └── script.js         # Lógica da Fetch API (CRUD completo)