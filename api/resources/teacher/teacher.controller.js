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