import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const partnersSchema = Joi.object({
  PartnerType: Joi.string()
    .valid("Agente Logística", "Cliente", "Despachante", "Fornecedor")
    .required()
    .messages({
      "any.required": "Tipo do parceiro é obrigatório",
      "any.only":
        "Tipo do parceiro deve ser: Agente Logística, Cliente, Despachante ou Fornecedor",
    }),

  PersonalityType: Joi.string()
    .valid("Física", "Jurídica")
    .required()
    .messages({
      "any.required": "Tipo de personalidade é obrigatório",
      "any.only": "Tipo de personalidade deve ser: Física ou Jurídica",
    }),

  CompanyName: Joi.string().min(2).max(255).required().messages({
    "any.required": "Razão social é obrigatória",
    "string.min": "Razão social deve ter pelo menos 2 caracteres",
    "string.max": "Razão social deve ter no máximo 255 caracteres",
  }),

  TradeName: Joi.string().min(1).max(255).required().messages({
    "any.required": "Nome fantasia é obrigatório",
    "string.min": "Nome fantasia deve ter pelo menos 1 caractere",
    "string.max": "Nome fantasia deve ter no máximo 255 caracteres",
  }),

  CnpjCpf: Joi.string()
    .pattern(/^(\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}|\d{3}\.\d{3}\.\d{3}-\d{2})$/)
    .required()
    .messages({
      "any.required": "CNPJ/CPF é obrigatório",
      "string.pattern.base":
        "CNPJ/CPF deve estar no formato correto (XX.XXX.XXX/XXXX-XX ou XXX.XXX.XXX-XX)",
    }),

  Segment: Joi.string().min(1).max(100).required().messages({
    "any.required": "Segmento é obrigatório",
    "string.min": "Segmento deve ter pelo menos 1 caractere",
    "string.max": "Segmento deve ter no máximo 100 caracteres",
  }),

  Category: Joi.string().min(1).max(100).required().messages({
    "any.required": "Categoria é obrigatória",
    "string.min": "Categoria deve ter pelo menos 1 caractere",
    "string.max": "Categoria deve ter no máximo 100 caracteres",
  }),

  ZipCode: Joi.string()
    .pattern(/^\d{5}-\d{3}$/)
    .required()
    .messages({
      "any.required": "CEP é obrigatório",
      "string.pattern.base": "CEP deve estar no formato XXXXX-XXX",
    }),

  Country: Joi.string().max(50).default("Brasil"),

  State: Joi.string().length(2).required().messages({
    "any.required": "UF é obrigatória",
    "string.length": "UF deve ter exatamente 2 caracteres",
  }),

  City: Joi.string().min(1).max(100).required().messages({
    "any.required": "Município é obrigatório",
    "string.min": "Município deve ter pelo menos 1 caractere",
    "string.max": "Município deve ter no máximo 100 caracteres",
  }),

  Street: Joi.string().min(1).max(255).required().messages({
    "any.required": "Logradouro é obrigatório",
    "string.min": "Logradouro deve ter pelo menos 1 caractere",
    "string.max": "Logradouro deve ter no máximo 255 caracteres",
  }),

  Number: Joi.string().min(1).max(20).required().messages({
    "any.required": "Número é obrigatório",
    "string.min": "Número deve ter pelo menos 1 caractere",
    "string.max": "Número deve ter no máximo 20 caracteres",
  }),

  District: Joi.string().min(1).max(100).required().messages({
    "any.required": "Bairro é obrigatório",
    "string.min": "Bairro deve ter pelo menos 1 caractere",
    "string.max": "Bairro deve ter no máximo 100 caracteres",
  }),

  Email: Joi.string().email().max(255).required().messages({
    "any.required": "Email é obrigatório",
    "string.email": "Email deve ter um formato válido",
    "string.max": "Email deve ter no máximo 255 caracteres",
  }),

  Phone: Joi.string()
    .pattern(/^\(\d{2}\)\s\d{4,5}-\d{4}$/)
    .required()
    .messages({
      "any.required": "Telefone é obrigatório",
      "string.pattern.base": "Telefone deve estar no formato (XX) XXXXX-XXXX",
    }),

  AddressComplement: Joi.string().max(255).optional().messages({
    "string.max": "Complemento deve ter no máximo 255 caracteres",
  }),

  MobilePhone: Joi.string()
    .pattern(/^\(\d{2}\)\s\d{5}-\d{4}$/)
    .optional()
    .messages({
      "string.pattern.base": "Celular deve estar no formato (XX) XXXXX-XXXX",
    }),

  Notes: Joi.string().optional(),
});

export const validatePartners = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = partnersSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    const errorDetails = error.details.map((detail) => ({
      field: detail.path.join("."),
      message: detail.message,
    }));

    return res.status(400).json({
      success: false,
      error: "Validation Error",
      message: "Dados inválidos fornecidos",
      details: errorDetails,
    });
  }

  next();
};
