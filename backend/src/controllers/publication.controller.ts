import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export class PublicationController {
   constructor() {}

   async create(request: Request, response: Response) {
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

   async listAll(request: Request, response: Response) {
      const publications = await prisma.publication.findMany({
         include: { user: true, likes: true },
         orderBy: { created_at: "desc" },
      });

      return response.send(publications);
   }

   async like(request: Request, response: Response) {
      const user_id = request.user_id;
      const { publication_id } = request.body;
      let type = "minus";

      const exists = await prisma.likes.findFirst({
         where: {
            publication_id,
            user_id,
         },
      });

      if (exists) {
         await prisma.likes.deleteMany({
            where: {
               publication_id,
               user_id,
            },
         });
      } else {
         await prisma.likes.create({
            data: {
               publication_id,
               user_id,
            },
         });
         type = "plus";
      }

      return response.send({ error: false, type });
   }
}
