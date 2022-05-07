import { capsuleModel } from './capsule.model.js'
import mongoose from 'mongoose'
export const fetchSingleCapsule = async (id) => {
	try {
		const capsule = await capsuleModel
			.aggregate([
				{
					$match: { _id: mongoose.Types.ObjectId(id) }
				},
				{
					'$lookup': {
						'from': 'teachers', 
						'localField': 'created_by', 
						'foreignField': '_id', 
						'as': 'created_by'
					}
				}, {
					'$lookup': {
						'from': 'comments', 
						'localField': 'comments', 
						'foreignField': '_id', 
						'as': 'comments'}
				}])
		if (!capsule) {
			return false
		}
		return capsule
	} catch (error) {
		console.error(error)
		return false
	}
}


export const fetchCapsules = async () => {
	try {
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
				}])
		if (!capsules) {
			return false
		}
		return capsules	
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
						{ description: new RegExp(search_term) },
						{ niche: new RegExp(search_term) }
					]
				}
			}])
		if(!search_result.toString()){
			return false
		}
		return search_result
	} catch (error) {
		return false
	}
}
