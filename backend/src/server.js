const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const { v4: uuidv4 } = require("uuid");

const api = express();
api.use(express.json());
api.use(cors());

const posts = [];

var connection = mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "root",
   database: "mysqljs",
});

connection.connect(function (err) {
   if (err) return;

   console.log("connection success!");
});

api.get("/api/produtos/:search?", (request, response) => {
   const search = request.params.search;
   let sql = "select * from produtos";

   if (search) {
      sql += ` where name like '%${search}%' or description like '%${search}%'`;
   }

   connection.query(sql, (error, results, fields) => {
      return response.json(results);
   });
});

api.post("/api/produtos", (request, response) => {
   const { name, description } = request.body;

   connection.query(
      "insert into produtos (name, description) values (?, ?)",
      [name, description],
      (error, results, fields) => {
         return response.json(
            !error ? "Cadastrado com sucesso" : error.sqlMessage
         );
      }
   );
});

api.put("/api/produto/:id", (request, response) => {
   const id = request.params.id;
   const { name, description } = request.body;

   connection.query(
      "update produtos set name = ?, description = ? where id = ?",
      [name, description, id],
      (error, results, fields) => {
         return response.json(
            !error ? "Alterado com sucesso" : error.sqlMessage
         );
      }
   );
});

api.delete("/api/produto/:id", (request, response) => {
   const id = request.params.id;
   connection.query(
      "delete from produtos where id = ?",
      [id],
      (error, results, fields) => {
         return response.json(
            !error ? "Deletado com sucesso" : error.sqlMessage
         );
      }
   );
});

api.get("/api/posts", (request, response) => {
   return response.json({ posts });
});

api.post("/api/posts", (request, response) => {
   const { title, content, author } = request.body;

   if (!title || !content || !author) {
      return response.status(403).send({ error: true });
   }

   const post = {
      title,
      content,
      author,
      id: uuidv4(),
      created_at: new Date(),
   };
   posts.push(post);

   return response.status(201).send();
});

api.patch("/api/posts/:id", (request, response) => {
   const id = request.params.id;
   const { title } = request.body;

   const index = posts.findIndex((post) => post.id == id);

   if (index > -1) {
      posts[index].title = title;
   } else {
      return response.status(404).send({
         message: "Post não encontrado",
         error: true,
      });
   }

   return response.status(200).send();
});

api.delete("/api/posts/:id", (request, response) => {
   const id = request.params.id;

   const index = posts.findIndex((post) => post.id == id);

   if (index > -1) {
      posts.splice(index, 1);
   }

   return response.send();
});

api.listen(3333, () => {
   console.log("Server Started on port 3333");
});
