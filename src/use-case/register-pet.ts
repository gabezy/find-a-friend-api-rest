import { Pet } from "@prisma/client";
import { PetsRepository } from "../repository/pets-repossitory";

interface RegisterPetCaseRequest {
  name: string;
  about: string;
  age: string;
  size: string;
  energy: string;
  independence: string;
  environment: string;
}

interface RegisterPetCaseResponse {
  pet: Pet;
}

export class RegisterPetUseCase {
  constructor(private readonly petsRepository: PetsRepository) {}

  async execute({
    name,
    about,
    age,
    energy,
    environment,
    independence,
    size,
  }: RegisterPetCaseRequest): Promise<RegisterPetCaseResponse> {
    const pet = await this.petsRepository.create({
      name,
      about,
      age,
      energy,
      environment,
      independence,
      size,
    });

    return {
      pet,
    };
  }
}
