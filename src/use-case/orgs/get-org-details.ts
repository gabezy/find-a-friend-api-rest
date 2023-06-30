import { OrgDetails, OrgsRepository } from "@/repository/orgs-repository";
import { ResourceNotFoundError } from "../erro/resource-not-found-error.error";

interface GetOrgDetailsUseCaseResponse {
  orgDetails: OrgDetails;
}

export class GetOrgDetailsUseCase {
  constructor(private readonly orgsRepository: OrgsRepository) {}

  async execute(id: string): Promise<GetOrgDetailsUseCaseResponse> {
    const orgDetails = await this.orgsRepository.getDetails(id);
    if (orgDetails == null) {
      throw new ResourceNotFoundError();
    }

    return {
      orgDetails,
    };
  }
}
