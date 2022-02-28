import { modModel } from '../mod/mod.model.js'
import { learnerModel } from '../learner/learner.model.js'
import { teacherModel } from '../teacher/teacher.model.js'

export const addMod = async (data_about_mod) => {
	try {
		await modModel.create({ ...data_about_mod })
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