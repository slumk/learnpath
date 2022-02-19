import { capsuleModel } from '../capsule/capsule.model.js'
import { courseModel } from '../course/course.model.js'
import { teacherModel } from '../teacher/teacher.model.js'

const fetchPending = async (model) => {
	try {
		const pending = await model.find({ is_approved: false }).sort({ created_at: -1 })
		return { data: pending }
	} catch (error) {
		console.error(error)
		return false
	}
}
export const fetchPendingTeachers = async () => ( await fetchPending(teacherModel))
export const fetchPendingCapsules = async () => ( await fetchPending(capsuleModel))
export const fetchPendingCourses = async () => ( await fetchPending(courseModel))

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

const fetchReported = async (model) => {
	try {
		const reported = await model.find().gt('report_count', 3)
		return { data: reported }
	} catch (error) {
		console.error(error)
		return false
	}
}

export const fetchReportedCapsules = async () => ( await fetchReported(capsuleModel))
export const fetchReportedCourses = async () => ( await fetchReported(courseModel))
export const fetchReportedTeachers = async () => ( await fetchReported(teacherModel))
