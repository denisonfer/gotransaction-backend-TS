import { Router } from 'express';
import { getRepository } from 'typeorm';

// import CreateTransactionService from '../services/CreateTransactionService';

const categoryRoutes = Router();

categoryRoutes.get('/', async (request, response) => {
  return response.json({ ok: true });
});

categoryRoutes.post('/', async (request, response) => {
  return response.json({ ok: true });
});

categoryRoutes.delete('/:id', async (request, response) => {
  // TODO
});

export default categoryRoutes;
