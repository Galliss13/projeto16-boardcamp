import { Router } from "express";
import { getGames, postGame } from "../controllers/games.controller.js";
import { gameSchemaValidation, verifyGameExistence } from "../middlewares/games.middleware.js";

const router = Router()

router.get('/games', getGames)
router.post('/games',gameSchemaValidation, verifyGameExistence, postGame)

export default router