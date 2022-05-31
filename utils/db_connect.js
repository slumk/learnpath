import mongoose from 'mongoose'
import dotenv from 'dotenv'
import config from '../config.js'

export const db_connect = async () => { 
	try {
		await mongoose.connect(config.MONGO_URI)
		console.log("DB Active")
	} catch (error) {
		console.error(error)
	}
}

export const test_db_connect = async () => {
	dotenv.config()
	try {
		await mongoose.connect(config.MONGO_TEST_URI)
	} catch (error) {
		console.error(error)
	}
}