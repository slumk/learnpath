import { capsuleModel } from '../capsule/capsule.model.js'
import { learnerModel } from './learner.model.js'
import { teacherModel } from '../teacher/teacher.model.js'
import { modModel } from '../mod/mod.model.js'

export const requestUpgradeToTeacher = async (req) => {
	try {
		const { name, desc, publichandle, niche } = req.body
		await teacherModel.create(
			{ 
				learner_id: req.user_id,
				teacher_name: name,
				teacher_desc: desc,
				portfolio: publichandle,
				niche: niche
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

export const upvoteCapsule = async (user_id, capsule_id) => {
	try {
		await capsuleModel.findByIdAndUpdate(capsule_id, { $inc: { upvote_count: 1 } })
		await learnerModel.findByIdAndUpdate(user_id, { $addToSet: { upvoted_capsules: capsule_id } })
		return true
	} catch (error) {
		console.error(error)
		return false
	}
}

export const minusUpvoteCapsule = async (user_id ,capsule_id) => {
	try {
		await capsuleModel.findByIdAndUpdate(capsule_id, { $inc: { upvote_count: -1 } })
		await learnerModel.findByIdAndUpdate(user_id, { $pull: { upvoted_capsules: capsule_id } })
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
		const learner = await learnerModel.findById(user_id).select('-password -age').lean()
		return { data: learner }
	} catch (error) {
		console.error(error)
		return false
	}
}

export const enrollCourse = async (user_id, course_id) => {
	try {
		await learnerModel.findByIdAndUpdate(user_id, { $addToSet: { enrolled_courses: course_id } })
		return true
	} catch (error) {
		console.error(error)
		return false
	}
}

export const reportTeacher = async (teacher_id) => {
	try {
		await teacherModel.findByIdAndUpdate(teacher_id,
			{ $inc: { report_count: 1 } })
		return true
	} catch (error) {
		console.error(error)
		return false
	}
}

export const fetchLearnerRelations = async (user_id) => {
	try {
		const user = {
			is_teacher: false,
			is_mod: false,
		}
		const is_teacher = await teacherModel.find({ learner_id: user_id }).lean()
		const is_mod = await modModel.find({ learner_id: user_id }).lean()
		if (await is_teacher[0]) {
			is_teacher[0].is_approved ? user.is_teacher = true : user.is_teacher = 'requested'
		}
		if (await is_mod[0]) {
			user.is_mod = true
		}
		return user
	} catch (error) {
		return false
	}
}