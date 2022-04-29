import bcrypt from 'bcryptjs'
import { learnerModel } from '../../resources/learner/learner.model.js'
import { modModel } from '../../resources/mod/mod.model.js'
import { teacherModel } from '../../resources/teacher/teacher.model.js'
import { makeToken } from './jwtOps.js'

export const loginLearner = async (learner_email, password) => {
	try {
		const learner = await learnerModel.findOne({ email: learner_email })
			.select('password')
		const teacher = await teacherModel.findOne({
			learner_id: learner._id
		})
		const match = await bcrypt.compare(password, learner.password)
		if (match) {
			const user_id = (learner._id).toString()
			const token = makeToken(user_id)
			return { user_token: token }
		}
		return false
		
	} catch (error) {
		console.error(error)
		return false
	}
}

export const createLearner = async (learner_name, learner_email, password, age, gender, region) => {
	try {
		const password_hash = await bcrypt.hash(password, 10)
		await learnerModel.create(
			{
				name : learner_name,
				email : learner_email,
				password: password_hash,
				age: age,
				gender: gender,
				region: region
			})
		return true
	}
	catch (error) {
		console.error(error)
		return false
	}
}
