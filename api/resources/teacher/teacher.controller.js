import { capsuleModel } from '../capsule/capsule.model.js'
import { courseModel } from '../course/course.model.js'

export const createCapsule = async (req) => {
	try {
		const data = req.body
		await capsuleModel.create({ ...data, created_by: req.teacher_id })
		return true
	} catch (error) {
		console.error(error)
		return false
	}
}

export const fetchOwnReportedCapsules = async (teacher_id) => {
	try {
		const ownReportedCapsules = await capsuleModel.find({
			created_by: teacher_id,
		}).gt('report_count', 3)
		if (ownReportedCapsules.toString()) {
			return ownReportedCapsules
		}
		return false
	} catch (error) {
		return false
	}
}

export const deleteCapsule = async (capsule_id) => {
	try {
		await capsuleModel.findByIdAndDelete(capsule_id)
		return true
	} catch (error) {
		console.error(error)
		return false
	} 
}

export const createCourse = async (req) => {
	const course_info = req.body
	const creator = req.teacher_id
	try {
		await courseModel.create({ ...course_info , created_by: creator})
		return true
	} catch (error) {
		console.error(error)
		return false
	}
}

export const deleteCourse = async (course_id) => {
	try {
		await courseModel.findByIdAndDelete(course_id)
		return true
	} catch (error) {
		console.error(error)
		return false
	}
}

export const fetchOwnCapsules = async (teacher_id) => {
	try {
		const ownCapsules = await capsuleModel.find({ created_by: teacher_id })
		return { data: ownCapsules }
	} catch (error) {
		console.error(error)
		return false
	}
}