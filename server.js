import express from 'express'
import { db_connect } from './utils/db_connect.js'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { ApolloServer } from 'apollo-server-express'
import { fullTypeDefs } from './graphql/schema.js'
import { fullResolvers } from './graphql/resolvers.js'
import { checkAuthStatus } from './utils/auth/protectRoutes.js'
import config from './config.js'

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
	typeDefs: fullTypeDefs,
	resolvers: fullResolvers,
	context: ({ req }) => ({
		user_id: checkAuthStatus(req.headers.authorization || "")
	})
})
db_connect()
gqlServer.start().then(() => gqlServer.applyMiddleware({ app }))
app.listen(config.PORT, () => (
	console.log(`SERVER: http://localhost:${config.PORT}/graphql`)
))