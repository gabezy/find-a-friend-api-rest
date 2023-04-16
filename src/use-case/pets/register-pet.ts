import { Pet } from "@prisma/client";
import { PetsRepository } from "@/repository/pets-repository";

interface RegisterPetCaseRequest {
  name: string;
  about: string;
  age: number;
  size: string;
  energy: number;
  independence: number;
  environment: string;
  org_id: string;
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
    org_id,
  }: RegisterPetCaseRequest): Promise<RegisterPetCaseResponse> {
    const pet = await this.petsRepository.create({
      name,
      about,
      age,
      energy,
      environment,
      independence,
      size,
      org_id,
    });

    return {
      pet,
    };
  }
}
