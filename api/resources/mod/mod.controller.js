import { capsuleModel } from '../capsule/capsule.model.js'
import { courseModel } from '../course/course.model.js'
import { teacherModel } from '../teacher/teacher.model.js'

const fetchPending = async (model) => {
	try {
		const pending = await model.find({ is_approved: false }).sort( { created_at: -1 })
		return { data: pending }
	} catch (error) {
		console.error(error)
		return false
	}
}
export const fetchPendingTeachers = fetchPending(teacherModel)
export const fetchPendingCapsules = fetchPending(capsuleModel)
export const fetchPendingCourses = fetchPending(courseModel)

// Need to apply some DRY here

export const approveCapsule = async (capsule_id) => {
	try {
		await capsuleModel.findByIdAndUpdate(capsule_id, { is_approved: true, is_visible: true })
		return true
	} catch (error) {
		console.error(error)
		return false
	}
}

export const approveCourse = async (course_id) => {
	try {
		await courseModel.findByIdAndUpdate(course_id, { is_approved: true })
		return true
	} catch (error) {
		console.error(error)
		return false
	}	
}

export const approveTeacher = async (teacher_id) => {
	try {
		await teacherModel.findByIdAndUpdate(teacher_id, { is_approved: true })
		return true
	} catch (error) {
		console.error(error)
		return false
	}
}