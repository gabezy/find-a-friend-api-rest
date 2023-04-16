import { OrgsRepository } from "@/repository/orgs-repository";
import { PetsRepository } from "@/repository/pets-repository";
import { Pet } from "@prisma/client";
import { OrgNotFoundError } from "../erro/org-not-found.error";

interface SearchPetsByCityRequest {
  uf: string;
  city: string;
}

interface SearchPetsByCityReponse {
  pets: Pet[];
}

export class SearchPetsByCityUseCase {
  constructor(
    private readonly petsRepository: PetsRepository,
    private readonly orgsRepository: OrgsRepository
  ) {}

  async execute({
    uf,
    city,
  }: SearchPetsByCityRequest): Promise<SearchPetsByCityReponse> {
    const orgs = await this.orgsRepository.findByUfAndCity(uf, city);

    if (orgs.length === 0) {
      throw new OrgNotFoundErro();
    }

    const pets = await this.petsRepository.findManyByOrgs(orgs);

    return {
      pets,
    };
  }
}
