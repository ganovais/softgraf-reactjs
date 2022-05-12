import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const api = express();
api.use(express.json());

api.post('/api/publications', async (request, response) => {
  const { description } = request.body;

  const publication = await prisma.publication.create({
    data: { description },
  });

  return response.send(publication);
});

api.listen('3333', () => {
  console.log('Server running on port 3333 🚀');
});
