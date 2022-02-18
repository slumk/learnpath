import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'
import { learnerModel } from '../../resources/learner/learner.model.js'
import { makeToken } from './jwtOps.js'

export const loginLearner = async (learner_email, password) => {
	try {
		const learner = await learnerModel.find({ email: learner_email })
			.select('password is_banned')
		if (learner.is_banned) {
			return false
		}
		const match = await bcrypt.compare(password, learner[0].password)
		if (match) {
			const user_id = (learner[0]._id).toString()
			const token = makeToken(user_id)
			return { user_token: token }
		}
		return false
		
	} catch (error) {
		console.error(error)
		return false
	}
}

export const createLearner = async (learner_name, learner_email, password, age) => {
	try {
		const password_hash = await bcrypt.hash(password, 10)
			.then((hash) => {
				return hash
			})
		const new_someone = await learnerModel.create(
			{
				name : learner_name,
				email : learner_email,
				password: password_hash,
				age: age
			})
		const { _id } = new_someone
		const token = makeToken(_id)
		return { data : token }
	}
	catch (error) {
		if (error instanceof mongoose.Error.ValidationError) {
			console.log('Validation Failed')
			return false
		}
		console.error(error)
		return false
	}
}
