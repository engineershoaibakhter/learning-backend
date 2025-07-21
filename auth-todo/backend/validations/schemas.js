const { z } = require("zod");

// User registration schema
const registerSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["admin", "sub-admin"]).default("sub-admin"),
});

// User login schema
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// Forgot password schema
const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

// Reset password schema
const resetPasswordSchema = z.object({
  token: z.string(),
  password: z.string().min(6),
});

// Todo creation schema
const createTodoSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
});

// Todo update schema
const updateTodoSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
});

module.exports = {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  createTodoSchema,
  updateTodoSchema,
};
