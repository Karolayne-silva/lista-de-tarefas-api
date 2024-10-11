import { Router } from "express";
import AuthenticateController from "../controllers/AuthenticateController";
const router = Router();

router.post("/", AuthenticateController.login);

export default router;