import connection from "../database/database.js";

export async function getGames(req, res) {
  let name = req.query.name 
  try {
    if (name) {
      name += '%'
      const games = await connection.query('SELECT * FROM games WHERE LOWER(name) LIKE LOWER($1)', [name]);
      res.send(games.rows);

    } else {
      const games = await connection.query("SELECT * FROM games");
      res.send(games.rows);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function postGame(req, res) {
  const { name, image, stockTotal, categoryId, pricePerDay } = req.body;
  try {
    const newCategory = await connection.query(
      'INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5)',
      [name, image, stockTotal, categoryId, pricePerDay]
    );
    console.log(newCategory.rows);
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
