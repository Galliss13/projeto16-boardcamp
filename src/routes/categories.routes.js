import { Router } from "express";
import { getCategories, postCategory } from "../controllers/categories.controller.js";
import { categorySchemaValidation, verifyCategoryExistence } from "../middlewares/categories.middleware.js";

const router = Router()

router.get('/categories', getCategories)
router.post('/categories',categorySchemaValidation, verifyCategoryExistence, postCategory)

export default router