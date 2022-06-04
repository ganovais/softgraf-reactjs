import { hash } from "bcrypt";
import { Request, Response } from "express";
import { deleteFile } from "../utils/file";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function exclude<User, Key extends keyof User>(
   user: User,
   ...keys: Key[]
): Omit<User, Key> {
   for (let key of keys) {
      delete user[key];
   }
   return user;
}
export class UserController {
   constructor() {}

   async create(request: Request, response: Response) {
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
            ? array_name[0] +
              "_" +
              (array_name[1] != "" ? array_name[1] : "zxcd")
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
   }

   async update(request: Request, response: Response) {
      const user_id = request.user_id;
      const { description, password } = request.body;
      let passwordHash = "";

      const user = await prisma.user.findUnique({
         where: { id: user_id },
      });

      if (!user) {
         throw new Error("Invalid token");
      }

      if (password) {
         passwordHash = await hash(password, 8);
      }

      const updatedUser = await prisma.user.update({
         data: {
            description: description || user.description,
            password: passwordHash || user.password,
         },
         where: {
            id: user_id,
         },
      });

      exclude(updatedUser, "password");

      return response.json(updatedUser);
   }

   async updateAvatar(request: Request, response: Response) {
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

      exclude(updatedUser, "password");

      return response.json(updatedUser);
   }

   async getMyFriends(request: Request, response: Response) {
      const user_id = request.user_id;

      const friends = await prisma.follows.findMany({
         where: {
            follower_id: user_id,
         },
         include: { following: true },
      });

      return response.send({ friends });
   }

   async getLikes(request: Request, response: Response) {
      const user_id = request.user_id;

      const likes = await prisma.likes.findMany({
         where: {
            user_id,
         },
      });

      return response.send({ likes });
   }

   async profile(request: Request, response: Response) {
      const { username } = request.params;

      const user = await prisma.user.findUnique({
         where: { username },
         include: { publications: { include: { likes: true, user: true } } },
      });

      if (!user) {
         throw new Error("User not found");
      }

      return response.send({ user });
   }
}
