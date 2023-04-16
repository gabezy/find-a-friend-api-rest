import { InMemoryPetsRepository } from "@/repository/in-memory/in-memory-pets-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { OrgsRepository } from "@/repository/orgs-repository";
import { InMemoryOrgsRepository } from "@/repository/in-memory/in-memory-orgs-repository";
import { PetsRepository } from "@/repository/pets-repository";
import { FindPetsByCharacteristicsUseCase } from "../pets/find-pets-by-characteristics-use-case";

let petsRepository: PetsRepository;
let orgsRepository: OrgsRepository;
let sut: FindPetsByCharacteristicsUseCase;

describe("Find pets by characteristics Use case", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    orgsRepository = new InMemoryOrgsRepository();
    sut = new FindPetsByCharacteristicsUseCase(petsRepository);
  });

  it("should be able to register a pet", async () => {
    const org = await orgsRepository.create({
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

    for (let i = 0; i <= 1; i++) {
      await petsRepository.create({
        name: "Lila",
        about: "",
        age: 10,
        energy: 3,
        environment: "Ambiente Amplo",
        independence: 4,
        size: "Médio",
        org_id: org.id,
      });
    }

    const { pets } = await sut.execute({
      age: 10,
      energy: 3,
      independence: 4,
      size: "médio",
    });

    expect(pets).toHaveLength(2);
    expect(pets).toEqual([
      expect.objectContaining({ energy: 3 }),
      expect.objectContaining({ energy: 3 }),
    ]);
  });
  it("should be able to list the pets based on the size", async () => {
    const org = await orgsRepository.create({
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

    for (let i = 0; i <= 1; i++) {
      await petsRepository.create({
        name: "Lila",
        about: "",
        age: 10,
        energy: 3,
        environment: "Ambiente Amplo",
        independence: 4,
        size: "Médio",
        org_id: org.id,
      });
    }

    await petsRepository.create({
      name: "Rex",
      about: "",
      age: 3,
      energy: 1,
      environment: "Ambiente Amplo",
      independence: 4,
      size: "Médio",
      org_id: org.id,
    });

    const { pets } = await sut.execute({
      size: "médio",
    });

    expect(pets).toHaveLength(3);
    expect(pets).toEqual([
      expect.objectContaining({ size: "Médio" }),
      expect.objectContaining({ size: "Médio" }),
      expect.objectContaining({ size: "Médio" }),
    ]);
  });
});
