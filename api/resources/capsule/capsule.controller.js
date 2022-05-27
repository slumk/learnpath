import { capsuleModel } from './capsule.model.js'

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
