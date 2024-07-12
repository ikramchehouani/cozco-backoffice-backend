const express = require("express");
const router = express.Router();
const authController = require("../../controller/auth/authController");
const verifyToken = require("../../middleware/verifyToken");
const checkRole = require("../../middleware/checkRole");

// Auth routes
router.post("/signup", authController.signup);
router.post("/signin", authController.signin);
router.post("/signout", authController.signout);
router.delete(
  "/delete-user/:id",
  verifyToken,
  authController.deleteAccountById
);
router.put("/update-user/:id", verifyToken, authController.updateUserById);
router.get("/users", verifyToken, authController.getBackofficeUsers);
router.get("/user/:id", verifyToken, authController.getUserById);
router.post("/send-reset-link", authController.sendResetLink);
router.post("/reset-password", authController.resetPassword);

module.exports = router;
