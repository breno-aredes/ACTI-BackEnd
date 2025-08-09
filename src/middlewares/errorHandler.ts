import { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
  statusCode?: number;
  code?: string;
}

export const errorHandler = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("🚨 Erro capturado:", error);

  if (error.message?.includes("CNPJ/CPF already exists")) {
    return res.status(409).json({
      success: false,
      error: "Conflict",
      message: "CNPJ/CPF já existe no sistema",
      details: error.message,
    });
  }

  if (error.message?.includes("ValidationError")) {
    return res.status(400).json({
      success: false,
      error: "Validation Error",
      message: "Dados inválidos fornecidos",
      details: error.message,
    });
  }

  if (error.code === "ELOGIN" || error.code === "ECONNREFUSED") {
    return res.status(503).json({
      success: false,
      error: "Database Connection Error",
      message: "Erro de conexão com o banco de dados",
      details: "Verifique se o SQL Server está rodando",
    });
  }

  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    error: "Internal Server Error",
    message: error.message || "Erro interno do servidor",
    ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
  });
};
