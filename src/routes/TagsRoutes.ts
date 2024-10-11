import { Router } from "express";
import TagsController from "../controllers/TagsController";
import authMiddleware from "../middlewares/authMiddleware";
const router = Router();

router.post("/create", authMiddleware, TagsController.create);
router.get("/", authMiddleware, TagsController.getAll);
router.get("/:id", authMiddleware, TagsController.getFindById);
router.patch("/:id", authMiddleware, TagsController.update);
router.delete("/:id",authMiddleware,  TagsController.delete);

export default router;
