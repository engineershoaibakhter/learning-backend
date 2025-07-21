const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");
const {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");
const role = require("../middlewares/roleMiddleware");
const { validate } = require("../middlewares/validationMiddleware");
const {
  createTodoSchema,
  updateTodoSchema,
} = require("../validations/schemas");

router.use(protect);

router.get("/dashboard", getTodos);
router.post("/dashboard", validate(createTodoSchema), createTodo);

router.put("/dashboard/:id", validate(updateTodoSchema), updateTodo);
router.delete("/dashboard/:id", role("admin"), deleteTodo);

module.exports = router;
