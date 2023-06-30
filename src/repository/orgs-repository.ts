import { Org, Prisma } from "@prisma/client";

export interface OrgDetails {
  name: string;
  email: string;
  person_in_change: string;
  whatsapp: string;
  logradouro: string;
  uf: string;
  cidade: string;
  bairro: string;
}

export interface OrgsRepository {
  findById: (id: string) => Promise<Org | null>;
  findByEmail: (email: string) => Promise<Org | null>;
  findByUfAndCity: (uf: string, city: string) => Promise<Org[]>;
  getDetails: (id: string) => Promise<OrgDetails | null>;
  create: (data: Prisma.OrgCreateInput) => Promise<Org>;
}
