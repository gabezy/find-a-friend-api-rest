import { Org, Prisma } from "@prisma/client";
import { OrgsRepository } from "../orgs-repository";
import { randomUUID } from "crypto";

export class InMemoryOrgsRepository implements OrgsRepository {
  private items: Org[] = [];

  async findById(id: string): Promise<Org | null> {
    const org = this.items.find((item) => item.id === id);
    if (org == null) {
      return null;
    }
    return org;
  }

  async create(data: Prisma.OrgCreateInput): Promise<Org> {
    const org = {
      id: randomUUID(),
      name: data.name,
      cep: data.cep,
      email: data.email,
      whatsapp: data.whatsapp,
      address: data.address,
      person_in_charge: data.person_in_charge,
      password: data.password,
    };
    this.items.push(org);

    return org;
  }
}
