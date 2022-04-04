import mongoose from 'mongoose'

export const db_connect = async () => { 
	try {
		await mongoose.connect(process.env.MONGO_URI)
		console.log('Server up and Connected to DB')
	} catch (error) {
		console.error(error)
	}
}

export const test_db_connect = async () => {
	try {
		await mongoose.connect(process.env.MONGO_TEST_URI)
		console.log('Connected to Test DB')
	} catch (error) {
		console.error(error)
	}
}