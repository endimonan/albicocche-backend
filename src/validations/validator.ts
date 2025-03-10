import { Request, Response, NextFunction } from "express";

interface ValidationSchema {
  [key: string]: {
    required?: boolean;
    type?: string;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    validate?: (value: any) => boolean;
    message?: string;
  };
}

export const validate = (schema: ValidationSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const errors: { [key: string]: string } = {};

    Object.keys(schema).forEach((field) => {
      const value = req.body[field];
      const rules = schema[field];

      if (
        rules.required &&
        (value === undefined || value === null || value === "")
      ) {
        errors[field] = rules.message || `O campo ${field} é obrigatório`;
        return;
      }

      if (value === undefined || value === null || value === "") {
        return;
      }

      if (rules.type && typeof value !== rules.type) {
        errors[field] =
          rules.message || `O campo ${field} deve ser do tipo ${rules.type}`;
        return;
      }

      if (
        rules.minLength !== undefined &&
        typeof value === "string" &&
        value.length < rules.minLength
      ) {
        errors[field] =
          rules.message ||
          `O campo ${field} deve ter pelo menos ${rules.minLength} caracteres`;
        return;
      }

      if (
        rules.maxLength !== undefined &&
        typeof value === "string" &&
        value.length > rules.maxLength
      ) {
        errors[field] =
          rules.message ||
          `O campo ${field} deve ter no máximo ${rules.maxLength} caracteres`;
        return;
      }

      if (rules.pattern && !rules.pattern.test(value)) {
        errors[field] =
          rules.message || `O campo ${field} possui formato inválido`;
        return;
      }

      if (rules.validate && !rules.validate(value)) {
        errors[field] = rules.message || `O campo ${field} é inválido`;
        return;
      }
    });

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        message: "Erros de validação",
        errors,
      });
    }

    next();
  };
};

export const loginSchema: ValidationSchema = {
  email: {
    required: true,
    type: "string",
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Email inválido",
  },
  password: {
    required: true,
    type: "string",
    minLength: 6,
    message: "Senha é obrigatória e deve ter pelo menos 6 caracteres",
  },
};

export const registerSchema: ValidationSchema = {
  name: {
    required: true,
    type: "string",
    minLength: 2,
    maxLength: 50,
    message: "Nome é obrigatório e deve ter entre 2 e 50 caracteres",
  },
  surname: {
    required: true,
    type: "string",
    minLength: 2,
    maxLength: 50,
    message: "Sobrenome é obrigatório e deve ter entre 2 e 50 caracteres",
  },
  email: {
    required: true,
    type: "string",
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Email inválido",
  },
  password: {
    required: true,
    type: "string",
    minLength: 6,
    message: "Senha é obrigatória e deve ter pelo menos 6 caracteres",
  },
};
