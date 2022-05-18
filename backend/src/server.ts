import express, { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import "express-async-errors";

import { ensureAuthenticated } from "./middleware/ensureAuthenticated";

const prisma = new PrismaClient();
const api = express();
api.use(express.json());

api.post(
   "/api/publications",
   ensureAuthenticated,
   async (request, response) => {
      const { description } = request.body;
      const user_id = request.user_id;

      const publication = await prisma.publication.create({
         data: {
            description,
            user_id,
         },
      });

      return response.send(publication);
   }
);

api.post("/api/users", async (request, response) => {
   const { name, email, password } = request.body;

   if (!name) {
      return response.send({ message: "Nome obrigatório", error: true });
   }

   if (!email) {
      return response.send({ message: "E-mail obrigatório", error: true });
   }

   if (!password) {
      return response.send({ message: "Senha obrigatório", error: true });
   }

   const there_is_email = await prisma.user.findUnique({
      where: { email },
   });

   if (there_is_email) {
      return response.send({
         message: "E-mail está vinculado a uma conta cadastrada",
         error: true,
      });
   }

   const array_name = name.toLowerCase().split(" ");

   let username =
      array_name.length > 1
         ? array_name[0] + "_" + (array_name[1] != "" ? array_name[1] : "zxcd")
         : array_name[0] + "_zxcd";

   const last_user = await prisma.user.findMany({
      where: { username: { contains: username } },
      orderBy: { created_at: "desc" },
      take: 1,
   });

   if (last_user.length) {
      const array_username = last_user[0].username.split("_");

      let increment = 0;

      if (array_username.length > 2) {
         increment = parseInt(array_username[2]) + 1;
      } else {
         username = username + "_1";
      }

      if (increment) {
         username = username + "_" + increment;
      }
   }

   const passwordHash = await hash(password, 8);

   const user = await prisma.user.create({
      data: {
         name,
         email,
         password: passwordHash,
         username,
      },
   });

   return response.send(user);
});

api.post("/api/login", async (request, response) => {
   const { email, password } = request.body;

   const user = await prisma.user.findUnique({
      where: { email },
   });

   if (!user) {
      return response.send({
         message: "E-mail ou senha incorreto.",
         error: true,
      });
   }

   const passwordMatch = await compare(password, user.password);

   if (!passwordMatch) {
      return response.send({
         message: "E-mail ou senha incorreto.",
         error: true,
      });
   }

   const token = sign({}, "17233d6a0dca50d6176817fb3438b2cc", {
      subject: String(user.id),
      expiresIn: "1d",
   });

   return response.send({
      user: {
         name: user.name,
         email: user.email,
      },
      token,
   });
});

api.use(
   (err: Error, request: Request, response: Response, next: NextFunction) => {
      return response.status(401).json({
         error: true,
         message: err.message,
      });
   }
);

api.listen("3333", () => {
   console.log("Server running on port 3333 🚀");
});
