import { Org, Pet, Prisma } from "@prisma/client";

export interface PetsRepository {
  findById: (id: string) => Promise<Pet | null>;
  findManyByOrgs: (orgs: Org[]) => Promise<Pet[]>;
  create: (data: Prisma.PetUncheckedCreateInput) => Promise<Pet>;
}
