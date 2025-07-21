const express = require("express");
const router = express.Router();
const {
  register,
  login,
  logout,
  resetPassword,
  forgotPassword,
} = require("../controllers/authController");
const { validate } = require("../middlewares/validationMiddleware");
const {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} = require("../validations/schemas");

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/forgot-password", validate(forgotPasswordSchema), forgotPassword);
router.post("/reset-password", validate(resetPasswordSchema), resetPassword);

router.get("/logout", logout);

module.exports = router;
