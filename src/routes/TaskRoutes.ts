import { Router } from "express";
import TaskController from "../controllers/TaskController";

const router = Router();

router.post("/create", TaskController.create);
router.get("/", TaskController.getAll);
router.get("/:id", TaskController.getFindById);
router.post("/bytags", TaskController.tasksByTag);
router.patch("/:id", TaskController.update);
router.delete("/:id", TaskController.delete);

export default router;
