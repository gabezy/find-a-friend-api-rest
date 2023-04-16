import { OrgsRepository } from "@/repository/orgs-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryOrgsRepository } from "@/repository/in-memory/in-memory-orgs-repository";
import { compare } from "bcryptjs";
import { RegisterOrgUseCase } from "../orgs/register-org";
import { OrgAlreadyExistsError } from "../erro/org-already-exists-error";

let orgsRepository: OrgsRepository;
let sut: RegisterOrgUseCase;

describe("Register Org Use Case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new RegisterOrgUseCase(orgsRepository);
  });

  it("should be able to register a organization", async () => {
    const { org } = await sut.execute({
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

    expect(org.id).toEqual(expect.any(String));
    expect(org.personInCharge).toEqual("Jonh Doe");
    expect(org.password).not.toEqual("123456");
  });

  it("should hash organization password upon registration", async () => {
    const { org } = await sut.execute({
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
    const isPasswordCorrectyHashed = await compare("123456", org.password);

    expect(isPasswordCorrectyHashed).toBe(true);
  });

  it("should not be able to register a organization with a email that is already registed", async () => {
    await sut.execute({
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

    await expect(
      async () =>
        await sut.execute({
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
        })
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError);
  });
});
