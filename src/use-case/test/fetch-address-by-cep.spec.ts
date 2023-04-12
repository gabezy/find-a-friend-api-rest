import { describe, expect, it } from "vitest";
import { getAddressByCep } from "../fetch-address-by-cep";

describe("Fetch Address by cep", () => {
  it("should get the address by fetch the cep", async () => {
    const address = await getAddressByCep("01001000");

    expect(address).toEqual(
      expect.objectContaining({
        logradouro: "Praça da Sé",
        uf: "SP",
        localidade: "São Paulo",
      })
    );
  });
});
