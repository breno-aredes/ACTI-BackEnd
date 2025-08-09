import { Request, Response } from "express";
import { fetchCnpjFromApi } from "../services/cnpjService";
import type { CnpjResponse } from "../types/cnpj";

export const getCnpjData = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { cnpj } = req.params;

    const cleanCnpj = cnpj.replace(/\D/g, "");

    if (cleanCnpj.length !== 14) {
      const response: CnpjResponse = {
        success: false,
        message: "CNPJ deve ter 14 dígitos",
      };
      res.status(400).json(response);
      return;
    }

    const cnpjData = await fetchCnpjFromApi(cleanCnpj);

    const response: CnpjResponse = {
      success: true,
      data: cnpjData,
    };

    res.json(response);
  } catch (error: any) {
    console.error("Erro ao consultar CNPJ:", error);

    const response: CnpjResponse = {
      success: false,
      message: error.message || "Erro interno do servidor.",
    };

    const statusCode = error.message?.includes("não encontrado")
      ? 404
      : error.message?.includes("inválido")
      ? 400
      : error.message?.includes("Muitas consultas")
      ? 429
      : 500;

    res.status(statusCode).json(response);
  }
};
