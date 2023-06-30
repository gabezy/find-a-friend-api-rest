import { Org, Prisma } from "@prisma/client";
import { OrgDetails, OrgsRepository } from "../orgs-repository";
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

  async findByUfAndCity(uf: string, city: string): Promise<Org[]> {
    return this.items.filter(
      (item) =>
        item.uf.toLocaleLowerCase() === uf.toLocaleLowerCase() &&
        item.cidade.toLocaleLowerCase() === city.toLocaleLowerCase()
    );
  }

  async findByEmail(email: string): Promise<Org | null> {
    const org = this.items.find((item) => item.email === email);

    if (org == null) {
      return null;
    }
    return org;
  }

  async getDetails(id: string): Promise<OrgDetails | null> {
    const org = await this.findById(id);
    if (org == null) {
      return null;
    }
    return {
      email: org.email,
      name: org.name,
      whatsapp: org.whatsapp,
      person_in_change: org.personInCharge,
      uf: org.uf,
      bairro: org.bairro,
      cidade: org.cidade,
      logradouro: org.logradouro,
    };
  }

  async create(data: Prisma.OrgCreateInput): Promise<Org> {
    const org: Org = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      whatsapp: data.whatsapp,
      personInCharge: data.personInCharge,
      cep: data.cep,
      uf: data.uf,
      logradouro: data.logradouro,
      cidade: data.cidade,
      bairro: data.bairro,
      role: "MEMBER",
      password: data.password,
    };
    this.items.push(org);

    return org;
  }
}
