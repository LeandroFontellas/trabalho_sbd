import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const routes = Router();
const prisma = new PrismaClient();

routes.get('/algumacoisa', async (req, res) => {
  const users = await prisma.pessoa.findMany();

  return res.status(200).json(users);
});

export { routes };
