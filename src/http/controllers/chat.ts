import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { chatUseCase } from '../../use-cases/chat';

export async function chat(request: FastifyRequest, reply: FastifyReply) {
  const chatBodySchema = z.object({
    prompt: z.array(z.string()),
  });

  const { prompt } = chatBodySchema.parse(request.body);

  const answers = await chatUseCase(prompt);

  reply.status(200).send({
    answers,
  });
}
