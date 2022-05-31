import { capsuleModel } from './capsule.model.js'
import { learnerModel } from '../learner/learner.model.js'
import { commentModel } from './comment/comment.model.js'

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

export const fetchSingleCapsule = async (id) => {
	try {
		const capsule = await capsuleModel.findById(id)
			.populate('created_by')
			.populate({
				path: 'comments',
				populate: { path: 'learner_id' }
			})
		return capsule
	} catch (error) {
		console.error(error)
		return {}
	}
}


export const fetchCapsules = async (input, filter) => {
	try {
		const matchCondition = { $match: {} }
		if (filter){
			if (filter.searchText){
				matchCondition.$match.$or = [
					{ label: { $regex: filter.searchText, $options: 'i' } },
					{ tags: { $elemMatch: { $regex: filter.searchText, $options: 'i' } } },
					{ description: { $regex: filter.searchText, $options: 'i' } },
					{ niche: { $regex: filter.searchText, $options: 'i' } }
				]
			}
		}
		const capsules = await capsuleModel
			.aggregate([
				{
					$match: {
						is_approved: true, 
						is_visible: true
					}
				},
				{
					$lookup: {
						from: 'teachers', 
						localField: 'created_by', 
						foreignField: '_id', 
						as: 'created_by'
					}
				}, {
					$unwind: "$created_by"
				}, {
					$skip: input.skip
				}, {
					$limit: input.limit
				}])
		return capsules	
	} catch (error) {
		console.error(error)
		return {}
	}
}
export const reportCapsule = async (capsule_id, report_reason) => {
	try {
		await capsuleModel.findByIdAndUpdate(capsule_id,
			{
				$inc: { report_count: 1 },
				report_reason: report_reason
			})
		return true
	} catch (error) {
		return false
	}
}
