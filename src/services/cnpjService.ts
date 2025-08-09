import axios from "axios";
import type { CnpjApiResponse, CnpjData } from "../types/cnpj";

const cnpjApi = axios.create({
  baseURL: "https://www.receitaws.com.br/v1",
  timeout: 15000,
});

export const fetchCnpjFromApi = async (cnpj: string): Promise<CnpjData> => {
  try {
    const response = await cnpjApi.get<CnpjApiResponse>(`/cnpj/${cnpj}`);

    if (!response.data || !response.data.nome) {
      throw new Error("CNPJ não encontrado");
    }

    return {
      companyName: response.data.nome,
      tradeName: response.data.fantasia || response.data.nome,
      email: response.data.email || "",
      phone: response.data.telefone || "",
    };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 429) {
        throw new Error("Muitas consultas. Tente novamente em alguns minutos.");
      } else if (error.response?.status === 400) {
        throw new Error("CNPJ inválido.");
      }
    }
    throw new Error("Erro ao consultar CNPJ. Tente novamente mais tarde.");
  }
};
