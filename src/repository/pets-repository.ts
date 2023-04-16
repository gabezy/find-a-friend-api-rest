import { Org, Pet, Photo, Prisma, Requirement } from "@prisma/client";

export interface PetCharacteristics {
  age?: number;
  energy?: number;
  size?: string;
  independence?: number;
}

export interface PetDetails {
  name: string;
  about: string;
  age: number;
  energy: number;
  size: string;
  environment: string;
  requirements?: Requirement;
  photos?: Photo;
}

export interface PetsRepository {
  findById: (id: string) => Promise<Pet | null>;
  findManyByOrgs: (orgs: Org[]) => Promise<Pet[]>;
  findManyByCharacteristics: (params: PetCharacteristics) => Promise<Pet[]>;
  getDetails: (id: string) => Promise<PetDetails | null>;
  create: (data: Prisma.PetUncheckedCreateInput) => Promise<Pet>;
}
