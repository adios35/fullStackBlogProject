import { Router } from "express";
import { login, logOut, register } from "../controller/authController.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.delete("/logout", logOut);

export default router;
