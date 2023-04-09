import { InMemoryPetsRepository } from "@/repository/in-memory/in-memory-pets-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { RegisterPetUseCase } from "../register-pet";
import { PetsRepository } from "@/repository/pets-repossitory";

let repository: PetsRepository;
let sut: RegisterPetUseCase;

describe("Register Pet Use case", () => {
  beforeEach(() => {
    repository = new InMemoryPetsRepository();
    sut = new RegisterPetUseCase(repository);
  });

  it("should be able to register a pet", async () => {
    const { pet } = await sut.execute({
      name: "Lila",
      about: "",
      age: "Filhote",
      size: "Grande",
      energy: "Baixa",
      environment: "Ambiente amplo",
      independence: "Média (Gosta de companhia)",
    });

    expect(pet.id).toEqual(expect.any(String));
    expect(pet.name).toEqual("Lila");
  });
});
