import express from 'express'
import { db_connect } from './utils/db_connect.js'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { ApolloServer } from 'apollo-server-express'
import { typeDefs } from './resources/capsule/capsule.types.js'
import { resolvers } from './resources/capsule/capsule.resolvers.js'

const app = express()
app.use(express.urlencoded({
	extended: true
}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(morgan('dev'))
app.use(cors())

dotenv.config()

const gqlServer = new ApolloServer({
	typeDefs,
	resolvers
})
gqlServer.start().then(() => gqlServer.applyMiddleware({ app }))
app.listen(process.env.PORT, () => (
	null
))
db_connect()