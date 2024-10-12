import { Router } from "express";
import UserController from "../controllers/UserController";
const router = Router();

router.post("/create", UserController.create);
router.get("/", UserController.getAll);
router.get("/:id", UserController.getUserById);
router.patch("/:id", UserController.update);
router.delete("/:id", UserController.delete);

export default router;
