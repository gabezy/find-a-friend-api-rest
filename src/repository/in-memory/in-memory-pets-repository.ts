import { Pet, Prisma } from "@prisma/client";
import { PetsRepository } from "../pets-repossitory";
import { randomUUID } from "crypto";

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = [];

  async findById(id: string): Promise<Pet | null> {
    const pet = this.items.find((item) => item.id === id);

    if (pet == null) {
      return null;
    }
    return pet;
  }

  async create(data: Prisma.PetCreateInput) {
    const pet = {
      id: randomUUID(),
      name: data.name,
      about: data.about,
      age: data.age,
      size: data.size,
      energy: data.energy,
      independence: data.independence,
      environment: data.environment,
      created_at: new Date(),
      updated_at: null,
    };

    this.items.push(pet);

    return pet;
  }
}
