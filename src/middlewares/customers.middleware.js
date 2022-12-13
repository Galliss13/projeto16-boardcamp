import connection from "../database/database.js";
import { customerSchema } from "../schemas/customer.model.js";

export async function customerSchemaValidation (req, res, next) {

    const customer = req.body;
    const {phone, cpf} = req.body;

    const { error } = customerSchema.validate(customer, {abortEarly: false})
    if (error) {
        const errors = error.details.map(detail => detail.message)
        return res.status(400).send(errors)
    }

    next()
}

export async function verifyCpfExistence (req, res, next) {

    const {cpf} = req.body;
    const cpfExists = await connection.query("SELECT * FROM customers WHERE cpf=$1", [cpf])
    console.log(cpfExists)
    if (cpfExists.rows.length !== 0) {
        return res.sendStatus(409)
    }

    next()
}

export async function verifyIdExistence (req, res, next) {

    const {id} = req.params;
    const idExists = await connection.query("SELECT * FROM customers WHERE id=$1", [id])
    console.log(idExists)
    if (idExists.rows.length !== 0) {
        return res.sendStatus(409)
    }

    next()

}