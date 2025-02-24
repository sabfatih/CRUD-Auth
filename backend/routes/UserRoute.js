import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/UsersController.js";
import {
  adminOnly,
  adminOrOwnerOnly,
  verifyUser,
} from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/users", verifyUser, adminOnly, getUsers);
router.get("/users/:id", verifyUser, adminOrOwnerOnly, getUserById);
router.post("/users", createUser);
router.patch("/users/:id", verifyUser, adminOrOwnerOnly, updateUser);
router.delete("/users/:id", verifyUser, adminOrOwnerOnly, deleteUser);

export default router;
