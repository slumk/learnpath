import { capsuleModel } from '../capsule/capsule.model.js'
import { learnerModel } from './learner.model.js'
import { teacherModel } from '../teacher/teacher.model.js'

// const fetchOwnAssets = async (model, user_id) => {

// }

export const requestUpgradeToTeacher = async (req) => {
	try {
		const { name, desc, publichandle } = req.body
		await teacherModel.create(
			{ 
				learner_id: req.user_id,
				teacher_name: name,
				teacher_desc: desc,
				portfolio: publichandle
			}
		)
		return true
	} catch (error) {
		console.error(error)
		return false
	}
}

export const requestAccountDeletion = async (learner_id) => {
	try {
		await learnerModel.findByIdAndUpdate(learner_id,
			{
				requested_delete : true
			}
		)
	} catch (error) {
		console.error(error)
		return false
	}
}

export const upvoteCapsule = async (capsule_id) => {
	try {
		await capsuleModel.findByIdAndUpdate(capsule_id, { $inc: { upvote_count: 1 } })
		return true
	} catch (error) {
		console.error(error)
		return false
	}
}

export const minusUpvoteCapsule = async (capsule_id) => {
	try {
		await capsuleModel.findByIdAndUpdate(capsule_id, { $inc: { upvote_count: -1 } })
		return true
	} catch (error) {
		console.error(error)
		return false
	}
}

export const downvoteCapsule = async (capsule_id) => {
	try {
		await capsuleModel.findByIdAndUpdate(capsule_id, { $inc: { downvote_count: 1 } })
		return true
	} catch (error) {
		console.error(error)
		return false
	}
}

export const minusDownvoteCapsule = async (capsule_id) => {
	try {
		await capsuleModel.findByIdAndUpdate(capsule_id, { $inc: { downvote_count: -1 } })
		return true
	} catch (error) {
		console.error(error)
		return false
	}
}

export const bookmarkCapsule = async (user_id, capsule_id) => {
	try {
		await learnerModel.findByIdAndUpdate(user_id, { $addToSet: { bookmarks: capsule_id } })
		return true
	} catch (error) {
		console.error(error)
		return false
	}
}
export const removeBookmark = async (user_id, capsule_id) => {
	try {
		await learnerModel.findByIdAndUpdate(user_id, { $pull: { bookmarks: capsule_id } })
		return true
	} catch (error) {
		console.error(error)
		return false
	}
}

export const viewLearnerInfo = async (user_id) => {
	try {
		const learner = await learnerModel.findById(user_id).select('-age -email -joined_date').lean()
		return { data: learner }
	} catch (error) {
		console.error(error)
		return false
	}
}