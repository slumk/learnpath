import { capsuleModel } from '../capsule/capsule.model.js'
import { learnerModel } from './learner.model.js'
import { teacherModel } from '../teacher/teacher.model.js'
import { commentModel } from './comment.model.js'
import mongoose from 'mongoose'

export const requestUpgradeToTeacher = async (input, user_id) => {
	try {
		const { name, desc, publichandle, niche } = input
		await teacherModel.create(
			{ 
				learner_id: user_id,
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
		await learnerModel.findByIdAndUpdate(learner_id, { requested_delete : true })
		console.log(learner_id)
		return true
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

export const commentCapsule = async (user_id, capsule_id, text) => {
	try {
		const comment = await commentModel.create({
			learner_id: user_id,
			comment_text: text	
		})
		await capsuleModel.findByIdAndUpdate(capsule_id,
			{ $addToSet: { comments: comment._id } })
		return true
	} catch (error) {
		console.error(error)
		return false
	} 
}

export const reportComment = async (comment_id, report_reason) => {
	try {
		await commentModel.findByIdAndUpdate(comment_id,{
			$inc: { report_count: 1 },
			report_reason: report_reason
		})
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
		const learner = await learnerModel.aggregate(
		[
			{
			  $match: {
				_id: mongoose.Types.ObjectId(user_id)
			  }
			}, {
			  $lookup: {
				from: 'teachers', 
				localField: '_id', 
				foreignField: 'learner_id', 
				as: 'teacher_details'
			  }
			}, {
			  $lookup: {
				from: 'capsules', 
				localField: 'bookmarks', 
				foreignField: '_id', 
				as: 'bookmarks'
			  }
			}, {
			  $lookup: {
				from: 'capsules', 
				localField: 'upvoted_capsules', 
				foreignField: '_id', 
				as: 'upvoted_capsules'
			  }
			}
		  ])
		return learner[0]
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