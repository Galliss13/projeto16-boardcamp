import connection from "../database/database.js";
import { gameSchema } from "../schemas/game.model.js";

export async function gameSchemaValidation (req, res, next) {

    const game = req.body;
    const { error } = gameSchema.validate(game, {abortEarly: false})
    if (error) {
        const errors = error.details.map(detail => detail.message)
        return res.status(400).send(errors)
    }
    next()
}

export async function verifyGameExistence (req, res, next) {

    const {name} = req.body;
    const gameExists = await connection.query("SELECT * FROM games WHERE name=$1", [name])
    console.log(gameExists)
    if (gameExists.length !== 0) {
        return res.sendStatus(409)
    }

    next()
}
