import express from 'express'
import morgan from 'morgan'
import config from './config'

const app = express()

// settings
app.set('port', config.PORT)

// middlewares
app.use(morgan("dev"))

export default app