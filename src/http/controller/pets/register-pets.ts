import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";

export const register = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const registerSchema = z.object({
    name: z.string(),
    about: z.string(),
    age: z.string(),
    size: z.string(),
    energy: z.string(),
    independence: z.string(),
    environment: z.string(),
  });

  const { name, about, age, energy, environment, independence, size } =
    registerSchema.parse(request.body);

  await prisma.pet.create({
    data: {
      name,
      about,
      age,
      energy,
      environment,
      independence,
      size,
    },
  });
  return await reply.status(201).send();
};
