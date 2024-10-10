import { Router } from "express";
import TagsController from "../controllers/TagsController";
const router = Router();

router.post("/", TagsController.create);
router.get("/", TagsController.getAll);
router.get("/:id", TagsController.getFindById);
router.patch("/:id", TagsController.update);
router.delete("/:id", TagsController.delete);

export default router;