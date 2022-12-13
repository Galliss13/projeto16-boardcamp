import connection from "../database/database.js";

export async function getRentals(req, res) {
  let { customerId, gameId } = req.query
  try {
    if (customerId && !gameId) {
      customerId += '%'
      const rentals = await connection.query("SELECT * FROM rentals WHERE customerId LIKE $1", [customerId]);
      res.send(rentals.rows);

    } else if (!customerId && gameId) {
      gameId += '%'
      const rentals = await connection.query("SELECT * FROM rentals WHERE gameId LIKE $1", [gameId]);
      res.send(rentals.rows);

    } else if (customerId && gameId) {
      customerId += '%'
      gameId += '%'
      const rentals = await connection.query("SELECT * FROM rentals WHERE customerId LIKE $1 AND gameId LIKE $2", [customerId, gameId]);
      res.send(rentals.rows);
      
    } else {
      const rentals = await connection.query("SELECT * FROM rentals");
      res.send(rentals.rows);
    }

    console.log(rentals);
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