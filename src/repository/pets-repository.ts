import { Org, Pet, Prisma } from "@prisma/client";

export interface PetCharacteristics {
  age?: number;
  energy?: number;
  size?: string;
  independence?: number;
}

export interface PetsRepository {
  findById: (id: string) => Promise<Pet | null>;
  findManyByOrgs: (orgs: Org[]) => Promise<Pet[]>;
  findManyByCharacteristics: (params: PetCharacteristics) => Promise<Pet[]>;
  create: (data: Prisma.PetUncheckedCreateInput) => Promise<Pet>;
}
