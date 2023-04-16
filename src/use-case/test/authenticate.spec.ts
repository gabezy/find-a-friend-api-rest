import { OrgsRepository } from "@/repository/orgs-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { AuthenticateOrgUseCase } from "../orgs/authenticate";
import { InMemoryOrgsRepository } from "@/repository/in-memory/in-memory-orgs-repository";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "../erro/invalid-credentials-error";

let orgsRepository: OrgsRepository;
let sut: AuthenticateOrgUseCase;

describe("Authenticate Org Use Case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new AuthenticateOrgUseCase(orgsRepository);
  });

  it("should be able to authenticate an organization", async () => {
    await orgsRepository.create({
      name: "Org Test",
      email: "org@example.com",
      personInCharge: "Jonh Doe",
      cep: "01001000",
      logradouro: "Praça da Sé",
      cidade: "São Paulo",
      bairro: "Sé",
      uf: "SP",
      password: await hash("123456", 6),
      whatsapp: "+5562999999999",
    });

    const { org } = await sut.execute({
      email: "org@example.com",
      password: "123456",
    });

    expect(org.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate an organization", async () => {
    await orgsRepository.create({
      name: "Org Test",
      email: "org@example.com",
      personInCharge: "Jonh Doe",
      cep: "01001000",
      logradouro: "Praça da Sé",
      cidade: "São Paulo",
      bairro: "Sé",
      uf: "SP",
      password: await hash("123456", 6),
      whatsapp: "+5562999999999",
    });

    expect(
      async () =>
        await sut.execute({
          email: "org@example.com",
          password: "12356",
        })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
