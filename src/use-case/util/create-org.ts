import { InMemoryOrgsRepository } from "@/repository/in-memory/in-memory-orgs-repository";
import { Org } from "@prisma/client";

export const createOrg = async (): Promise<Org> => {
  const orgRepository = new InMemoryOrgsRepository();
  return await orgRepository.create({
    name: "Org Test",
    email: "org@example.com",
    personInCharge: "Jonh Doe",
    cep: "01001000",
    logradouro: "Praça da Sé",
    cidade: "São Paulo",
    bairro: "Sé",
    uf: "SP",
    password: "123456",
    whatsapp: "+5562999999999",
  });
};
