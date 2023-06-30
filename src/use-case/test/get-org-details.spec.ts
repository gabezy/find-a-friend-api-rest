import { InMemoryOrgsRepository } from "@/repository/in-memory/in-memory-orgs-repository";
import { OrgsRepository } from "@/repository/orgs-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { ResourceNotFoundError } from "../erro/resource-not-found-error.error";
import { GetOrgDetailsUseCase } from "../orgs/get-org-details";

let orgsRepository: OrgsRepository;
let sut: GetOrgDetailsUseCase;

describe("Get organization details Use Case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new GetOrgDetailsUseCase(orgsRepository);
  });

  it("should be able to get the organization details", async () => {
    const org = await orgsRepository.create({
      name: "Org Test",
      email: "org@example.com",
      personInCharge: "Jonh Doe",
      cep: "01001000",
      logradouro: "Praça da Sé",
      cidade: "São Paulo",
      bairro: "Sé",
      uf: "SP",
      password: "123456",
      whatsapp: "+5562999999999",
    });

    const { orgDetails } = await sut.execute(org.id);
    expect(orgDetails).toEqual(
      expect.objectContaining({
        whatsapp: expect.any(String),
        name: expect.any(String),
      })
    );
  });

  it("should not be able to get the organization details", async () => {
    await orgsRepository.create({
      name: "Org Test",
      email: "org@example.com",
      personInCharge: "Jonh Doe",
      cep: "01001000",
      logradouro: "Praça da Sé",
      cidade: "São Paulo",
      bairro: "Sé",
      uf: "SP",
      password: "123456",
      whatsapp: "+5562999999999",
    });

    await expect(async () => await sut.execute("test")).rejects.toBeInstanceOf(
      ResourceNotFoundError
    );
  });
});
