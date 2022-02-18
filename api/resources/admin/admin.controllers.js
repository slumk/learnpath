import { modModel } from '../mod/mod.model.js'
import { learnerModel } from '../learner/learner.model.js'

export const addMod = async (data_about_mod) => {
	try {
		await modModel.create(...data_about_mod)
		return true
	} catch (error) {
		console.error(error)
		return false
	}
}

export const banUser = async (learner_id) => {
	try {
		await learnerModel.findByIdAndUpdate(learner_id, { is_banned: true })
		return true
	} catch (error) {
		console.error(error)
		return false
	}
}