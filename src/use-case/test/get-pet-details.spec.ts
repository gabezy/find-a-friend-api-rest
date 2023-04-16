import { PetsRepository } from "@/repository/pets-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { GetPetDetailsUseCase } from "../pets/get-pet-details";
import { InMemoryPetsRepository } from "@/repository/in-memory/in-memory-pets-repository";
import { createOrg } from "../util/create-org";

let petsRepository: PetsRepository;
let sut: GetPetDetailsUseCase;

describe("Get Pet Details Use Case", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    sut = new GetPetDetailsUseCase(petsRepository);
  });

  it("should be able to get the details of a pet based in the pet's id", async () => {
    const org = await createOrg();

    const pet = await petsRepository.create({
      name: "Lila",
      age: 7,
      size: "Grande",
      about: "",
      energy: 2,
      environment: "Ambiente Amplo",
      org_id: org.id,
      independence: 3,
    });

    const { petDetails } = await sut.execute({ id: pet.id });

    expect(petDetails.name).toEqual("Lila");
    expect(petDetails).toEqual(
      expect.objectContaining({
        requirements: undefined,
      })
    );
  });
});
