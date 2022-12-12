import connection from "../database/database.js";

export async function getGames(req, res) {
  try {
    const games = await connection.query("SELECT * FROM games");
    console.log(games);
    res.send(games.rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function postGame(req, res) {
  const { name, image, stockTotal, categoryId, pricePerDay } = req.body;
  console.log(req.body)
  try {
    const newCategory = await connection.query(
      "INSERT INTO games (name, image, categoryId, pricePerDay) VALUES ($1, $2, $3, $4, $5)",
      [name, image, stockTotal, categoryId, pricePerDay]
    );
    console.log(newCategory.rows);
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
