import express from "express";
import { sendEmail } from "../controllers/emailcontroller.js";

const router = express.Router();

router.post("/", sendEmail);

export default router;
