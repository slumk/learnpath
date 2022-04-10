import express from 'express'
import { db_connect } from './utils/db_connect.js'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import apiRouter from './apiRoutes.js'

const app = express()
app.use(express.urlencoded({
	extended: true
}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(morgan('dev'))
app.use(cors())
app.use('/',apiRouter)
dotenv.config()


app.listen(process.env.PORT, () => (
	null
))
db_connect()