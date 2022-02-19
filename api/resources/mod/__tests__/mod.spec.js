import { test_db_connect } from '../../../utils/db_connect'
import { capsuleModel } from '../../capsule/capsule.model'
import mongoose from 'mongoose'
import { approveTeacher, approveCapsule, approveCourse, fetchReportedCapsules, fetchReportedCourses, fetchReportedTeachers, fetchPendingCapsules, fetchPendingCourses, fetchPendingTeachers } from '../mod.controller'
import { courseModel } from '../../course/course.model'
import { teacherModel } from '../../teacher/teacher.model'

beforeAll(async () => {
	await test_db_connect()
	//clears database
	await capsuleModel.deleteMany()
	await courseModel.deleteMany()
	await teacherModel.deleteMany()
	// inserting a test entry in database
	var test_entry = new capsuleModel({
		_id: '620fa734dd24eb1316beabff',
		yt_src: 'somerandomlinkman',
		label: 'test_label',
		description: 'this is a test description about test',
		created_by: new mongoose.Types.ObjectId(),
		tags: ['test-1', 'test-2', 'test-3'],
		report_count : 4
	})
	await test_entry.save()
	const gen_test_capsules = () => {
		const capsule_array = []
		for (var i = 0; i < 7; i++) {
			capsule_array.push(mongoose.Types.ObjectId())
		}
		return capsule_array
	}
	test_entry = new courseModel({
		_id: '620fabb4d9f218213b6243c9',
		name: 'test-course',
		desc: 'this is a test-description',
		created_by: new mongoose.Types.ObjectId(),
		capsules: gen_test_capsules(),
		report_count: 4
	})
	await test_entry.save()
	test_entry = new teacherModel({
		_id: '620fabb4d9f218213b6243c9',
		learner_id: new mongoose.Types.ObjectId(),
		teacher_name: 'test-teacher',
		teacher_desc: 'this is a test description about teacher',
		report_count: 5
	})
	await test_entry.save()
})

describe('Fetching pending shit', () => {
	test('Fetching pending capsules', async () => {
		const pending = await fetchPendingCapsules()
		expect(pending.data[0].is_approved).toBeFalsy()
		expect(pending.data).toBeTruthy()
	})
	test('Fetching pending courses', async () => {
		const pending = await fetchPendingCourses()
		expect(pending.data[0].is_approved).toBeFalsy()
		expect(pending.data).toBeTruthy()
	})
	test('Fetching pending teachers', async () => {
		const pending = await fetchPendingTeachers()
		expect(pending.data[0].is_approved).toBeFalsy()
		expect(pending.data).toBeTruthy()
	})
})

describe('Approving Shit', () => {
	test('Approving capsule', async () => {
		await approveCapsule('620fa734dd24eb1316beabff')
		const capsule = await capsuleModel.findById('620fa734dd24eb1316beabff')
		expect(capsule.is_approved).toBeTruthy()
		expect(capsule.is_visible).toBeTruthy()
	})

	test('Approving course', async () => {
		await approveCourse('620fabb4d9f218213b6243c9')
		const course = await courseModel.findById('620fabb4d9f218213b6243c9')
		expect(course.is_approved).toBeTruthy()
	})

	test('Approve teacher', async () => {
		await approveTeacher('620fabb4d9f218213b6243c9')
		const teacher = await teacherModel.findById('620fabb4d9f218213b6243c9')
		expect(teacher.is_approved).toBeTruthy()
	})
})

describe('Fetching reported shit', () => {
	test('Fetching reported Capsules', async () => {
		const reported_capsules = await fetchReportedCapsules()
		expect(reported_capsules.data[0].report_count).toBeGreaterThanOrEqual(3)
		expect(reported_capsules.data).toBeTruthy()
	})

	test('Fetching reported Courses', async () => {
		const reported_courses = await fetchReportedCourses()
		expect(reported_courses.data[0].report_count).toBeGreaterThanOrEqual(3)
		expect(reported_courses.data).toBeTruthy()
	})

	test('Fetching reported teachers', async () => {
		const reported_teachers = await fetchReportedTeachers()
		expect(reported_teachers.data[0].report_count).toBeGreaterThanOrEqual(3)
		expect(reported_teachers.data).toBeTruthy()
	})
})