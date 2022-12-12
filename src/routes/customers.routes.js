import { Router } from "express";
import { getCustomerById, getCustomers, postCostumer, putCostumer } from "../controllers/customers.controller.js";
import { customerSchemaValidation, verifyCpfExistence } from "../middlewares/clients.middleware.js";

const router = Router()

router.get('/customers', getCustomers)
router.get('/customers/:id', getCustomerById)
router.post('/customers', customerSchemaValidation, verifyCpfExistence, postCostumer)
router.put('/customers/:id', customerSchemaValidation, verifyCpfExistence, putCostumer)


export default router