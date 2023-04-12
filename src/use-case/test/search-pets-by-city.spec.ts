import { OrgsRepository } from "@/repository/orgs-repository";
import { PetsRepository } from "@/repository/pets-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { SearchPetsByCityUseCase } from "../search-pets-by-city";
import { InMemoryPetsRepository } from "@/repository/in-memory/in-memory-pets-repository";
import { InMemoryOrgsRepository } from "@/repository/in-memory/in-memory-orgs-repository";

let petsRepository: PetsRepository;
let orgsRepository: OrgsRepository;
let sut: SearchPetsByCityUseCase;

describe("Search pets by city Use Case", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    orgsRepository = new InMemoryOrgsRepository();
    sut = new SearchPetsByCityUseCase(petsRepository, orgsRepository);
  });

  it("should be able to list all pets based in the state and city", async () => {
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

    const org1 = await orgsRepository.create({
      name: "Org 2 Test",
      email: "org2@example.com",
      personInCharge: "Jonh Doe",
      cep: "01001000",
      logradouro: "Praça da Sé",
      cidade: "Campinas",
      bairro: "Sé",
      uf: "SP",
      password: "123456",
      whatsapp: "+5562999999999",
    });

    petsRepository.create({
      name: "Rex",
      about: "",
      age: 5,
      energy: 3,
      independence: 2,
      size: "Pequeno",
      environment: "Ambiente pequeno",
      org_id: org.id,
    });

    petsRepository.create({
      name: "Rex",
      about: "",
      age: 5,
      energy: 3,
      independence: 2,
      size: "Pequeno",
      environment: "Ambiente pequeno",
      org_id: org1.id,
    });

    const { pets } = await sut.execute({ uf: "SP", city: "São Paulo" });

    expect(pets).toHaveLength(1);
    expect(pets).toEqual([expect.objectContaining({ org_id: org.id })]);
  });
});
