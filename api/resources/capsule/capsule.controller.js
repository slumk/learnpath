import { capsuleModel } from './capsule.model.js'
export const fetchSingleCapsule = async (id) => {
	try {
		const capsule = await capsuleModel
			.findById(id)
			.populate('created_by')
			.populate({
				path: 'comments',
				populate: {
					path: 'learner_id',
					select: 'name'
				}
			})
		if (!capsule) {
			return false
		}
		return { data: capsule }
	} catch (error) {
		console.error(error)
	}
}


export const fetchCapsules = async () => {
	try {
		const capsules = await capsuleModel
			.find({
				is_approved: true,
				is_visible: true,
			})
			.populate('created_by', 'teacher_name')
		if (!capsules) {
			return false
		}
		return { data: capsules }
	} catch (error) {
		console.error(error)
		return false
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
		console.error(error)
		return false
	}
}

export const searchCapsule = async (search_term) => {
	try {
		const search_result = await capsuleModel
			.aggregate([{
				$match: {
					$or: [
						{ label: new RegExp(search_term) },
						{ tags: { $elemMatch: { $regex: new RegExp(search_term) } } },
						{ description: new RegExp(search_term) }
					]
				}
			}])
		if(!search_result.toString()){
			return false
		}
		return { result: search_result }
	} catch (error) {
		return false
	}
}
