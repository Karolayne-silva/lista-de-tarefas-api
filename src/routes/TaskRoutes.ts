import { Router } from "express";
import TaskController from "../controllers/TaskController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.post("/create", authMiddleware, TaskController.create);
router.get("/", authMiddleware, TaskController.getAll);
router.get("/:id", authMiddleware, TaskController.getFindById);
router.post("/bytags", authMiddleware, TaskController.tasksByTag);
router.patch("/:id", authMiddleware,  TaskController.update);
router.delete("/:id", authMiddleware,  TaskController.delete);

export default router;
