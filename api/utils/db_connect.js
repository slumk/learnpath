import mongoose from 'mongoose'

export const db_connect = async () => { 
	try {
		await mongoose.connect(process.env.MONGO_URI)
		console.log('successfully connected to db')
	} catch (error) {
		console.error(error)
	}
}

export const test_db_connect = async () => {
	try {
		await mongoose.connect(process.env.MONGO_TEST_URI)
	} catch (error) {
		console.error(error)
	}
}