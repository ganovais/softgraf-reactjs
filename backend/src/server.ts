import express, { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import "express-async-errors";
import cors from "cors";
import multer from "multer";
import { resolve } from "path";

import { ensureAuthenticated } from "./middleware/ensureAuthenticated";
import uploadConfig from "./config/upload";
import { deleteFile } from "./utils/file";

const prisma = new PrismaClient();
const api = express();
api.use(express.json());
api.use(cors());

const publication_files = resolve(__dirname, "uploads", "publication");
const avatar_files = resolve(__dirname, "uploads", "avatar");

api.use("/uploads/publication", express.static(`${publication_files}`));
api.use("/uploads/avatar", express.static(`${avatar_files}`));

const uploadAvatar = multer(uploadConfig.upload("avatar"));
const uploadPublication = multer(uploadConfig.upload("publication"));

api.post(
   "/api/publications",
   uploadPublication.single("file"),
   ensureAuthenticated,
   async (request, response) => {
      const { description } = request.body;
      const user_id = request.user_id;
      const image = request.file?.filename;

      const publication = await prisma.publication.create({
         data: {
            description,
            image,
            user_id,
         },
      });

      return response.send(publication);
   }
);

api.get("/api/publications", ensureAuthenticated, async (request, response) => {
   const publications = await prisma.publication.findMany({
      include: { user: true, likes: true },
      orderBy: { created_at: "desc" },
   });

   return response.send(publications);
});

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

   await prisma.user.create({
      data: {
         name,
         email,
         password: passwordHash,
         username,
      },
   });

   return response.send({ error: false });
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
         username: user.username,
      },
      token,
   });
});

api.post("/api/user/me", ensureAuthenticated, async (request, response) => {
   const user_id = request.user_id;

   const user = await prisma.user.findUnique({
      where: { id: user_id },
   });

   if (!user) {
      throw new Error("Invalid token");
   }

   return response.send({
      user: {
         name: user.name,
         email: user.email,
         username: user.username,
      },
   });
});

api.patch(
   "/api/user",
   uploadAvatar.single("avatar"),
   ensureAuthenticated,
   async (request, response) => {
      const user_id = request.user_id;
      const avatar_file = request.file?.filename;

      const user = await prisma.user.findUnique({
         where: { id: user_id },
      });

      if (!user) {
         throw new Error("Invalid token");
      }

      if (user.avatar) {
         await deleteFile(`/uploads/avatar/${user.avatar}`);
      }

      const updatedUser = await prisma.user.update({
         data: {
            avatar: avatar_file,
         },
         where: {
            id: user_id,
         },
      });

      // delete updatedUser.password;

      return response.json(updatedUser);
   }
);

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
