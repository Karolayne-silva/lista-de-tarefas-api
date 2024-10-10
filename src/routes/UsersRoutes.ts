import { Router } from "express";
import UserController from "../controllers/UserController";
const router = Router();

router.post("/", UserController.create);
router.get("/", UserController.getAll);
router.delete("/:id", UserController.delete);

export default router;