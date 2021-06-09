import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { ICreatePessoaDTO } from 'dtos';

const routes = Router();
const prisma = new PrismaClient();

routes.post('/pessoa', async (req, res) => {
  try {
    const pessoa: ICreatePessoaDTO = req.body;

    let createdPessoa;
    if (!pessoa.datapagamentoinscricao) {
      createdPessoa = await prisma.pessoa.create({
        data: {
          ...pessoa,
        },
      });
    } else {
      createdPessoa = await prisma.pessoa.create({
        data: {
          ...pessoa,
          datapagamentoinscricao: new Date(pessoa.datapagamentoinscricao),
        },
      });
    }

    return res.status(201).json(createdPessoa);
  } catch (error) {
    return res
      .status(500)
      .json({ errorName: error.name, message: error.message });
  }
});

routes.post('/pessoa/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const pessoa: ICreatePessoaDTO = req.body;

    const editedPessoa = await prisma.pessoa.update({
      where: { idpessoa: Number(id) },
      data: pessoa,
    });

    return res.status(200).json(editedPessoa);
  } catch (error) {
    return res
      .status(500)
      .json({ errorName: error.name, message: error.message });
  }
});

routes.get('/pessoa', async (req, res) => {
  try {
    const pessoas = await prisma.pessoa.findMany();

    return res.status(200).json(pessoas);
  } catch (error) {
    return res
      .status(500)
      .json({ errorName: error.name, message: error.message });
  }
});

routes.get('/pessoa/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const pessoa = await prisma.pessoa.findMany({
      where: { idpessoa: Number(id) },
    });

    return res.status(200).json(pessoa);
  } catch (error) {
    return res
      .status(500)
      .json({ errorName: error.name, message: error.message });
  }
});

routes.delete('/pessoa/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.pessoa.delete({ where: { idpessoa: Number(id) } });

    return res.status(204).json();
  } catch (error) {
    return res
      .status(500)
      .json({ errorName: error.name, message: error.message });
  }
});

export { routes };
