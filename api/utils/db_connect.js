import mongoose from 'mongoose'
import dotenv from 'dotenv'

export const db_connect = async () => { 
	try {
		await mongoose.connect(process.env.MONGO_URI)
		console.log('Server up and Connected to DB')
	} catch (error) {
		console.error(error)
	}
}

export const test_db_connect = async () => {
	dotenv.config()
	try {
		await mongoose.connect(process.env.MONGO_TEST_URI)
	} catch (error) {
		console.error(error)
	}
}