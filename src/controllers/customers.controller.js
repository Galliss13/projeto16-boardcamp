import connection from "../database/database.js";

export async function getCustomers(req, res) {
  let cpf = req.query.cpf
  try {
    if (cpf) {
      cpf += '%'
      const customers = await connection.query('SELECT * FROM games WHERE cpf LIKE $1', [cpf]);
      res.send(customers.rows);
    } else {
      const customers = await connection.query('SELECT * FROM games');
      res.send(customers.rows);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function getCustomerById(req, res) {
  const { id } = req.params;
  try {
    const customer = await connection.query(
      "SELECT * FROM customers WHERE id=$1",
      [id]
    );
    console.log(customer);
    res.send(customer.rows[0]);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function postCostumer(req, res) {
  const { name, phone, cpf, birthday } = req.body;
  try {
    const newCostumer = await connection.query(
      "INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)",
      [name, phone, cpf, birthday]
    );
    console.log(newCostumer.rows);
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function putCostumer(req, res) {
    const { name, phone, cpf, birthday } = req.body;
    try {
      const newCostumer = await connection.query(
        "UPDATE customers SET phone=$1 WHERE cpf=$2",
        [phone, cpf]
      );
      console.log(newCostumer.rows);
      res.sendStatus(201);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }
