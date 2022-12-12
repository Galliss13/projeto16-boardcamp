import { Router } from "express";
import { deleteRental, finalizeRental, getRentals, postRental } from "../controllers/rentals.controller.js";
import { RentalSchemaValidation, variablesRentalDefinition } from "../middlewares/rentals.middleware.js";

const router = Router()

router.get('/rentals', getRentals)
router.post('/rentals', RentalSchemaValidation, variablesRentalDefinition, postRental)
router.post('/rentals/:id/return', finalizeRental)
router.delete('/rentals/:id', deleteRental)


export default router