import { modModel } from '../mod/mod.model.js'
import { learnerModel } from '../learner/learner.model.js'
import { teacherModel } from '../teacher/teacher.model.js'

export const addMod = async (learner_id) => {
	try {
		const learner = await learnerModel.findById(learner_id).lean()
		await modModel.create({
			learner_id: learner._id,
			gender: learner.gender,
			age: learner.age
		})
		return true
	} catch (error) {
		console.error(error)
		return false
	}
}

export const banUser = async (teacher_id) => {
	try {
		await teacherModel.findByIdAndUpdate(teacher_id, { is_banned: true })
		return true
	} catch (error) {
		console.error(error)
		return false
	}
}

export const fetchAllLearners = async () => {
	try {
		const learners = await learnerModel.find()
		if (learners) {
			return { data: learners }
		}
		return false
	} catch (error) {
		console.error(error)
		return false
	}
}