import fastify from "fastify";
import { petsRoutes } from "./http/controller/pets/routes";

export const app = fastify();

const start = async () => {
  await app.register(petsRoutes);
};

start();
