import { FastifyInstance } from "fastify";
import { register } from "./register-pets";

export const petsRoutes = async (app: FastifyInstance) => {
  app.post("/pets", register);
};
