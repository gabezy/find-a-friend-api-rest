interface AddressJson {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
}

export const getAddressByCep = async (cep: string): Promise<AddressJson> => {
  const URL = `https://viacep.com.br/ws/${cep}/json/`;
  try {
    const response = await fetch(URL);
    const json = await response.json();
    return json;
  } catch (ex) {
    throw new Error("CEP Inválido");
  }
};
