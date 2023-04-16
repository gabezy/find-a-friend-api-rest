import { OrgsRepository } from "@/repository/orgs-repository";
import { Org } from "@prisma/client";
import { hash } from "bcryptjs";
import { OrgAlreadyExistsError } from "../erro/org-already-exists-error";

interface RegisterOrgUseCaseRequest {
  name: string;
  personInCharge: string;
  email: string;
  cep: string;
  uf: string;
  cidade: string;
  bairro: string;
  logradouro: string;
  whatsapp: string;
  password: string;
}

interface RegisterOrgUseCaseResponse {
  org: Org;
}

export class RegisterOrgUseCase {
  constructor(private readonly orgsRepository: OrgsRepository) {}

  async execute({
    name,
    email,
    personInCharge,
    cep,
    uf,
    cidade,
    bairro,
    logradouro,
    whatsapp,
    password,
  }: RegisterOrgUseCaseRequest): Promise<RegisterOrgUseCaseResponse> {
    const password_hash = await hash(password, 6);

    const orgWithSameEmail = await this.orgsRepository.findByEmail(email);

    if (orgWithSameEmail != null) {
      throw new OrgAlreadyExistsError();
    }

    const org = await this.orgsRepository.create({
      name,
      personInCharge,
      email,
      cep,
      cidade,
      bairro,
      logradouro,
      uf,
      whatsapp,
      password: password_hash,
    });

    return {
      org,
    };
  }
}
