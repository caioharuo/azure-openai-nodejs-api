import { FastifyInstance } from 'fastify';
import { chat } from './controllers/chat';

export async function appRoutes(app: FastifyInstance) {
  app.post('/chat', chat);
}
