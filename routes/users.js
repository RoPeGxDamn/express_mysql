const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const { authenticateToken } = require("../utils");

router.get("/", authenticateToken, userController.getAll);
router.post("/register", userController.register);
router.post("/login", userController.login);
router
  .route("/:id")
  .delete(authenticateToken, userController.remove)
  .put(authenticateToken, userController.changeStatus);

module.exports = router;
