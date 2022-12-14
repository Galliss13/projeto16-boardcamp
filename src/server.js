import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import categoriesRoutes from './routes/categories.routes.js'
import customersRoutes from './routes/customers.routes.js'
import gamesRoutes from './routes/games.routes.js'
import rentalsRoutes from './routes/rentals.routes.js'

const app = express()
app.use(cors())
app.use(express.json())

app.use(categoriesRoutes)
app.use(customersRoutes)
app.use(gamesRoutes)
app.use(rentalsRoutes)


const port = process.env.PORT || 4000

app.listen(port, () => console.log(`App running in port ${port}`))