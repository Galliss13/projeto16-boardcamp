import connection from "../database/database.js";
import { rentalSchema } from "../schemas/rental.model.js";
import dayjs from "dayjs";

export async function RentalSchemaValidation (req, res, next) {

    const rental = req.body;
    const { error } = rentalSchema.validate(rental, {abortEarly: false})
    if (error) {
        const errors = error.details.map(detail => detail.message)
        return res.status(400).send(errors)
    }
    next()
}

export async function variablesRentalDefinition(req, res, next) {
    const { daysRented, gameId} = req.body

    try {
        const game = await connection.query("SELECT * FROM games WHERE id=$1", [gameId]);
        const pricePerDay = game.rows[0].pricePerDay
        const originalPrice = daysRented * pricePerDay
        const rentDate = dayjs().format('YYYY-MM-DD')

        res.locals = {originalPrice, rentDate}

        next()

      } catch (err) {
        console.log(err);
        res.sendStatus(500);
      }


}
