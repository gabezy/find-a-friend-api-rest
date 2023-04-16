import { PetDetails, PetsRepository } from "@/repository/pets-repository";
import { ResourceNotFoundError } from "../erro/resource-not-found-error.error";

interface GetPetDetailsUseCaseRequest {
  id: string;
}

interface GetPetDetailsUseCaseResponse {
  petDetails: PetDetails;
}

export class GetPetDetailsUseCase {
  constructor(private readonly petsRepository: PetsRepository) {}

  async execute({
    id,
  }: GetPetDetailsUseCaseRequest): Promise<GetPetDetailsUseCaseResponse> {
    const petDetails = await this.petsRepository.getDetails(id);

    if (petDetails == null) {
      throw new ResourceNotFoundError();
    }

    return {
      petDetails,
    };
  }
}
