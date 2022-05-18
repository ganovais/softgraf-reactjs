import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface IPayload {
   sub: string;
}

export async function ensureAuthenticated(
   request: Request,
   response: Response,
   next: NextFunction
) {
   const authHeader = request.headers.authorization;

   if (!authHeader) {
      throw new Error("Token missing");
   }

   const [, token] = authHeader.split(" ");

   try {
      const { sub: user_id } = verify(
         token,
         "17233d6a0dca50d6176817fb3438b2cc"
      ) as IPayload;

      const user = await prisma.user.findUnique({
         where: { id: parseInt(user_id) },
      });

      if (!user) {
         throw new Error("User not found");
      }

      request.user_id = parseInt(user_id);

      next();
   } catch (error: any) {
      throw new Error(error);
   }
}
