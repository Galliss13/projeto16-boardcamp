import connection from "../database/database.js";
import { categorySchema } from "../schemas/category.model.js";

export async function categorySchemaValidation (req, res, next) {

    const category = req.body;
    const { error } = categorySchema.validate(category, {abortEarly: false})
    if (error) {
        const errors = error.details.map(detail => detail.message)
        return res.status(400).send(errors)
    }
    next()
}

export async function verifyCategoryExistence (req, res, next) {

    const {name} = req.body;
    const categoryExists = await connection.query("SELECT * FROM categories WHERE name=$1", [name])
    console.log(categoryExists)
    if (categoryExists.length !== 0) {
        return res.sendStatus(409)
    }

    next()
}