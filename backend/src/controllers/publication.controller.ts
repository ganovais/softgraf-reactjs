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
}
