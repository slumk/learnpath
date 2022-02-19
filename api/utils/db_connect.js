import mongoose from 'mongoose'

export const db_connect = async () => { 
	try {
		await mongoose.connect('mongodb://localhost:27017/learnpath-db')
		console.log('successfully connected to learnpath-db')
	} catch (error) {
		console.error(error)
	}
}

export const test_db_connect = async () => {
	try {
		await mongoose.connect('mongodb://localhost:27017/test-db')
	} catch (error) {
		console.error(error)
	}
}