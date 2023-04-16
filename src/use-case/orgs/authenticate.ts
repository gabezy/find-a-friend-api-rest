import { OrgsRepository } from "@/repository/orgs-repository";
import { compare } from "bcryptjs";
import { InvalidCredentialsError } from "../erro/invalid-credentials-error";
import { Org } from "@prisma/client";

interface AutheticateOrgUseCaseRequest {
  email: string,
  password: string,
}

interface AutheticateOrgUseCaseResponse {
  org: Org,
}

export class AuthenticateOrgUseCase {
  constructor(private readonly orgsRepository: OrgsRepository) {}

  async execute({email, password}: AutheticateOrgUseCaseRequest): Promise<AutheticateOrgUseCaseResponse> {
    const org = await this.orgsRepository.findByEmail(email);

    if (org == null) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatches = await compare(password, org.password);

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    return {
      org,
    }


  }
}
