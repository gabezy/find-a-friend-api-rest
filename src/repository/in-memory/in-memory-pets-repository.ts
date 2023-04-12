import { Org, Pet, Prisma } from "@prisma/client";
import { PetsRepository } from "../pets-repository";
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

  async findManyByOrgs(orgs: Org[]): Promise<Pet[]> {
    const orgsIdArr = orgs.map((org) => org.id);
    return this.items.filter((item) => orgsIdArr.includes(item.org_id));
  }

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
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
      org_id: data.org_id,
    };

    this.items.push(pet);

    return pet;
  }
}
