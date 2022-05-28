import { courseModel } from './course.model.js'

export const fetchCourses = async () => {
	try {
		const courses = await courseModel.find({ is_approved: true })
		if (!courses) {
			return false
		}
		return { data : courses }
		
	} catch (error) {
		console.error(error)
		return false
	}
}
 
export const fetchSingleCourse = async (course_id) => {
	try {
		const course_info = await courseModel.findById(course_id)
		if (!course_info) {
			return false
		}
		return { details: course_info }
        
	} catch (error) {
		console.error(error)
		return false
	}
}

export const reportCourse = async (course_id) => {
	try {
		const course_to_be_reported = await courseModel.findByIdAndUpdate(course_id, { $inc: { report_count: 1 } })
		if (!course_to_be_reported) {
			return false
		}
		return true
	} catch (error) {
		console.error(error)
		return false
	}
}
