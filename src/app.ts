import { Router } from 'express';
import { empresa, pessoa, PrismaClient } from '@prisma/client';
import valida from './valida';

const routes = Router();
const prisma = new PrismaClient();

// um exemplo de integridade de dados ou alguma funcionalidade da
// aplicaçao que inclua a necessidade de uso de iteraçao(loop)e
// que deve ser implementada por meio de gatilho;

/* Rotas Pessoa */
routes.post('/pessoa', async (req, res) => {
  try {
    const Pessoa: pessoa = req.body;
    if (!Pessoa.cpf) {
      throw new Error('CPF does not exist');
    }

    let createdPessoa;
    if (valida(Pessoa.cpf)) {
      if (!Pessoa.datapagamentoinscricao) {
        createdPessoa = await prisma.pessoa.create({
          data: Pessoa,
        });
      } else {
        createdPessoa = await prisma.pessoa.create({
          data: {
            ...Pessoa,
            datapagamentoinscricao: new Date(Pessoa.datapagamentoinscricao),
          },
        });
      }
    }
    return res.status(201).json(createdPessoa);
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

    const Pessoa = await prisma.pessoa.findMany({
      where: { idpessoa: Number(id) },
    });

    return res.status(200).json(Pessoa);
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

routes.post('/pessoa/subscribe-to-all-tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const allTasks = await prisma.tarefa.findMany();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const PromiseSubscritionsArray: any[] = []; // criando array vazio que vai comportar as promises
    allTasks.forEach(task => {
      const createSub = prisma.inscricao.create({
        data: { idpessoa: Number(id), idtarefa: task.idtarefa },
      });
      PromiseSubscritionsArray.push(createSub);
    });

    await prisma.$transaction(PromiseSubscritionsArray);

    return res.status(204).json();
  } catch (error) {
    return res
      .status(500)
      .json({ errorName: error.name, message: error.message });
  }
});

/* Rotas Empresa */
routes.post('/empresa', async (req, res) => {
  try {
    const Empresa: empresa = req.body;

    const createdEmpresa = await prisma.empresa.create({
      data: Empresa,
    });

    return res.status(201).json(createdEmpresa);
  } catch (error) {
    return res
      .status(500)
      .json({ errorName: error.name, message: error.message });
  }
});

routes.post('/empresa/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const Empresa: empresa = req.body;

    const editedEmpresa = await prisma.empresa.update({
      where: { idempresa: Number(id) },
      data: Empresa,
    });

    return res.status(200).json(editedEmpresa);
  } catch (error) {
    return res
      .status(500)
      .json({ errorName: error.name, message: error.message });
  }
});

routes.get('/empresa', async (req, res) => {
  try {
    const empresas = await prisma.empresa.findMany();

    return res.status(200).json(empresas);
  } catch (error) {
    return res
      .status(500)
      .json({ errorName: error.name, message: error.message });
  }
});

routes.get('/empresa/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const Empresa = await prisma.empresa.findMany({
      where: { idempresa: Number(id) },
    });

    return res.status(200).json(Empresa);
  } catch (error) {
    return res
      .status(500)
      .json({ errorName: error.name, message: error.message });
  }
});

routes.delete('/empresa/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.empresa.delete({ where: { idempresa: Number(id) } });

    return res.status(204).json();
  } catch (error) {
    return res
      .status(500)
      .json({ errorName: error.name, message: error.message });
  }
});

export { routes };
