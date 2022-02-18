import { capsuleModel } from './capsule.model.js'
export const fetchSingleCapsule = async (id) => {
	try {
		const capsule = await capsuleModel
			.findById(id)
			.lean()
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
			.find({ is_approved: true, is_visible: true, $limit: 5 })
			.lean()
		if (!capsules) {
			return false
		}
		return { data: capsules }
	} catch (error) {
		console.error(error)
		return false
	}
}
export const reportCapsule = async (capsule_id) => {
	try {
		await capsuleModel.findByIdAndUpdate(capsule_id, { $inc: { report_count: 1 } })
			.lean()
		return true
	} catch (error) {
		console.error(error)
		return false
	}
}

export const searchCapsule = async (search_term) => {
	try {
		const search_result = await capsuleModel.find({ $text: { $search: search_term } },)
		if(!search_result.toString()){
			return false
		}
		return { result: search_result }
	} catch (error) {
		console.error(error)
		return false
	}
}
