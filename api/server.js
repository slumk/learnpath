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
		user_id: '6280617bdde72a74f9ab9b5d',
	})
})
db_connect()
gqlServer.start().then(() => gqlServer.applyMiddleware({ app }))
app.listen(process.env.PORT, () => (
	console.log(`SERVER: http://localhost:${process.env.PORT}/graphql`)
))