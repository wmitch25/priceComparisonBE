import { Router } from "express";
import { searchProducts } from "../controllers/searchController.js";

const router = Router();

router.get("/search", searchProducts);

export default router;
