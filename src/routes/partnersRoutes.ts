import express from "express";
import { PartnersController } from "../controllers/partnersController";
import { validatePartners } from "../middlewares/validation";

const router = express.Router();
const partnersController = new PartnersController();

router.post("/", validatePartners, partnersController.createPartner);

export default router;
