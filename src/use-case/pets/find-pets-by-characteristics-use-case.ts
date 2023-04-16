import { Pet } from "@prisma/client";
import {
  PetCharacteristics,
  PetsRepository,
} from "@/repository/pets-repository";

interface FindPetsByCharacteristicsReponse {
  pets: Pet[];
}

export class FindPetsByCharacteristicsUseCase {
  constructor(private readonly petsRepository: PetsRepository) {}

  async execute({
    age,
    energy,
    independence,
    size,
  }: PetCharacteristics): Promise<FindPetsByCharacteristicsReponse> {
    const pets = await this.petsRepository.findManyByCharacteristics({
      age: age,
      size: size,
      energy: energy,
      independence: independence,
    });
    return {
      pets,
    };
  }
}
