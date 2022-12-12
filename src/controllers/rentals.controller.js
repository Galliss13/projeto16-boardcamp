import connection from "../database/database.js";

export async function getRentals(req, res) {
  try {
    const rentals = await connection.query("SELECT * FROM rentals");
    console.log(rentals);
    res.send(rentals.rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function postRental(req, res) {

    const { customerId, gameId, daysRented } = req.body;
    const {originalPrice, rentDate} = res.locals
    console.log(req.body)

    try {
      const newRental = await connection.query(
        "INSERT INTO rentals (customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee ) VALUES ($1, $2, $3, $4, $5, $6, $7)",
        [customerId, gameId, rentDate, daysRented, null, originalPrice, null ]
      );
      console.log(newRental.rows);
      res.sendStatus(201);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }

export async function finalizeRental(req, res) {
    const {id} = req.params
}

export async function deleteRental(req, res) {
    const {id} = req.params

    try {
      await connection.query("DELETE * FROM rentals WHERE id=$1", [id]);
      console.log(rentals);
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
}