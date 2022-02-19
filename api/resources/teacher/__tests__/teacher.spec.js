import { capsuleModel } from '../../capsule/capsule.model'
import { courseModel } from '../../course/course.model'
import { test_db_connect } from '../../../utils/db_connect'
import { createCapsule, createCourse } from '../teacher.controller'
import mongoose from 'mongoose'

beforeAll(async () => {
	await test_db_connect()
	capsuleModel.deleteMany()
	courseModel.deleteMany()
})

test('Creating Capsule', async () => {
	const req_mock = {}
	req_mock.body = {
		yt_src: 'www.youtube.com/watch/test_video',
		label: 'test name',
		description: 'this is a test-description',
		tags: ['test1', 'test2'],
	}
	req_mock.teacher_id = new mongoose.Types.ObjectId()
	const created_capsule = await createCapsule(req_mock)
	const is_capsule_found = capsuleModel.findById(created_capsule._id)
	expect(is_capsule_found).not.toBe([])
	expect(is_capsule_found).toBeTruthy()
})

test('Creating Course', async () => {
	const req_mock = {}
	const gen_test_capsules = () => {
		const capsule_array = []
		for (var i = 0; i < 7; i++) {
			capsule_array.push(mongoose.Types.ObjectId())
		}
		return capsule_array
	}
	req_mock.body = {
		name: 'test-course',
		desc: 'this is a test-description',
		capsules: gen_test_capsules()
	}
	req_mock.teacher_id = new mongoose.Types.ObjectId()
	const created_course = await createCourse(req_mock)
	const is_course_found = courseModel.findById(created_course._id)
	expect(is_course_found).not.toBe([])
	expect(is_course_found).toBeTruthy()
})