import { modModel } from '../mod/mod.model.js'
import { learnerModel } from '../learner/learner.model.js'
import { teacherModel } from '../teacher/teacher.model.js'

export const addMod = async (learner_id) => {
	try {
		const learner = await learnerModel.findById(learner_id).lean()
		await modModel.create({
			learner_id: learner._id,
			name: learner.name,
			email: learner.email,
			gender: learner.gender,
			age: learner.age
		})
		await learnerModel.findByIdAndUpdate(learner_id, {
			is_mod: true
		})
		return true
	} catch (error) {
		console.error(error)
		return false
	}
}

export const removeMod = async (mod_id) => {
	try {
		await modModel.findByIdAndDelete(mod_id)
		return true
	} catch (error) {
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

const fetchAllPeople = async (model) => {
	try {
		const people = await model.find()
		return { data: people }
	} catch (error) {
		console.error(error)
		return false
	}
}

export const fetchAllMods = async () => await fetchAllPeople(modModel)
export const fetchAllLearners = async () => await fetchAllPeople(learnerModel)
export const fetchAllTeachers = async () => await fetchAllPeople(teacherModel)