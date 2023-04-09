import { OrgsRepository } from "@/repository/orgs-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { RegisterOrgUseCase } from "../register-org";
import { InMemoryOrgsRepository } from "@/repository/in-memory/in-memory-orgs-repository";

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
      cep: "99999999",
      personInCharge: "Jonh Doe",
      address: "Somewhere",
      password: "123456",
      whatsapp: "+5562999999999",
    });

    expect(org.id).toEqual(expect.any(String));
    expect(org.person_in_charge).toEqual("Jonh Doe");
  });
});
