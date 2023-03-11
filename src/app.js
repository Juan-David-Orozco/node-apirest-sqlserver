import express from 'express'
import morgan from 'morgan'
import config from './config'

import productsRoute from './routes/products.route'

const app = express()

// settings
app.set('port', config.PORT)

// middlewares
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
app.use('/api', productsRoute)

export default app