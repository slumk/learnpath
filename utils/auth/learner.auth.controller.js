import bcrypt from 'bcryptjs'
import { learnerModel } from '../../resources/learner/learner.model.js'
import { makeToken } from './jwtOps.js'

export const loginLearner = async (input) => {
	try {
		const learner = await learnerModel.findOne({ email: input.email })
			.select('password')
		const match = await bcrypt.compare(input.password, learner.password)
		if (match) {
			const user_id = (learner._id).toString()
			const token = makeToken(user_id)
			return {
				isSuccessful: true,
				token: token
			}
		}
		return { 
			isSuccessful: false
		 }
		
	} catch (error) {
		console.error(error)
		return { isSuccessful: false }
	}
}

export const createLearner = async (input) => {
	try {
		const password_hash = await bcrypt.hash(input.password, 10)
		await learnerModel.create(
			{
				name : input.name,
				email : input.email,
				password: password_hash,
				age: input.age,
				gender: input.gender,
				region: input.region
			})
		return true
	}
	catch (error) {
		console.error(error)
		return false
	}
}
