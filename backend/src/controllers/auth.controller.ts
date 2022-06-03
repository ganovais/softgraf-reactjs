import { compare } from "bcrypt";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class AuthController {
   constructor() {}

   async login(request: Request, response: Response) {
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
            avatar: user.avatar,
            description: user.description,
         },
         token,
      });
   }

   async me(request: Request, response: Response) {
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
            avatar: user.avatar,
            description: user.description,
         },
      });
   }

   async profile(request: Request, response: Response) {
      const { username } = request.params;

      const user = await prisma.user.findUnique({
         where: { username },
      });

      if (!user) {
         throw new Error("User not found");
      }

      return response.send({ user });
   }
}
