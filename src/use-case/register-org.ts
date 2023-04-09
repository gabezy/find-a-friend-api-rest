import { OrgsRepository } from "@/repository/orgs-repository";
import { Org } from "@prisma/client";
import { hash } from "bcryptjs";

interface RegisterOrgUseCaseRequest {
  name: string;
  personInCharge: string;
  email: string;
  cep: string;
  address: string;
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
    address,
    whatsapp,
    password,
  }: RegisterOrgUseCaseRequest): Promise<RegisterOrgUseCaseResponse> {
    const password_hash = await hash(password, 6);

    const org = await this.orgsRepository.create({
      name,
      person_in_charge: personInCharge,
      email,
      cep,
      address,
      whatsapp,
      password: password_hash,
    });

    return {
      org,
    };
  }
}
