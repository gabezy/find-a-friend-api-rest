import { InMemoryPetsRepository } from "@/repository/in-memory/in-memory-pets-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { RegisterPetUseCase } from "../pets/register-pet";
import { OrgsRepository } from "@/repository/orgs-repository";
import { InMemoryOrgsRepository } from "@/repository/in-memory/in-memory-orgs-repository";
import { PetsRepository } from "@/repository/pets-repository";

let petsRepository: PetsRepository;
let orgsRepository: OrgsRepository;
let sut: RegisterPetUseCase;

describe("Register Pet Use case", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    orgsRepository = new InMemoryOrgsRepository();
    sut = new RegisterPetUseCase(petsRepository);
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

    const { pet } = await sut.execute({
      name: "Lila",
      about: "",
      age: 10,
      energy: 3,
      environment: "Ambiente Amplo",
      independence: 4,
      size: "Médio",
      org_id: org.id,
    });

    expect(pet.id).toEqual(expect.any(String));
    expect(pet.name).toEqual("Lila");
    expect(pet.org_id).toEqual(org.id);
  });
});
