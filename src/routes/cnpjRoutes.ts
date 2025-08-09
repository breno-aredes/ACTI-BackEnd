import { Router } from "express";
import { getCnpjData } from "../controllers/cnpjController";

const router = Router();

router.get("/:cnpj", getCnpjData);

export default router;
