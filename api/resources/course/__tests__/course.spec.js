import { test_db_connect } from '../../../utils/db_connect'
import { courseModel } from '../course.model'
import mongoose from 'mongoose'
import { fetchCourses, fetchSingleCourse, reportCourse } from '../course.controller'

beforeAll(async () => {
	await test_db_connect()
	await courseModel.deleteMany()
	// test_capsules_for_inserting_into_course
	const gen_test_capsules = () => {
		const capsule_array = []
		for (var i = 0; i < 7; i++) {
			capsule_array.push(mongoose.Types.ObjectId())
		}
		return capsule_array
	}
	const test_entry = new courseModel({
		_id: '620fabb4d9f218213b6243c9',
		name: 'test-course',
		desc: 'this is a test-description',
		created_by: new mongoose.Types.ObjectId(),
		capsules: gen_test_capsules(),
		is_approved: true,
	})
	await test_entry.save()
})

test('Fetching All Courses', async () => {
	const courses = await fetchCourses()
	expect(courses).not.toBe([])
	expect(courses).toBeTruthy()
})

test('Fetching Single Course Info', async () => {
	const course = await fetchSingleCourse('620fabb4d9f218213b6243c9')
	expect(course).not.toBe([])
	expect(course).toBeTruthy()
})

test('Fetching False Course Info', async () => {
	const course = await fetchSingleCourse('620fabb5d9f218213b6243c9')
	expect(course).toBeFalsy()
})

test('Reports a course', async () => {
	await reportCourse('620fabb4d9f218213b6243c9')
	var course_to_be_checked = await courseModel.findById('620fabb4d9f218213b6243c9')
	expect(course_to_be_checked.report_count).toBe(1)
	await reportCourse('620fabb4d9f218213b6243c9')
	course_to_be_checked = await courseModel.findById('620fabb4d9f218213b6243c9')
	expect(course_to_be_checked.report_count).toBe(2)
})