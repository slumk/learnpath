import { capsuleModel } from '../../capsule/capsule.model'
import { courseModel } from '../../course/course.model'
import { test_db_connect } from '../../../utils/db_connect'
import { createCapsule, createCourse, deleteCapsule, deleteCourse } from '../teacher.controller'
import mongoose from 'mongoose'

beforeAll(async () => {
	await test_db_connect()
	capsuleModel.deleteMany()
	courseModel.deleteMany()
	const test_entry = new capsuleModel({
		_id: '507f1f77bcf86cd799439011',
		yt_src: 'somerandomlink',
		label: 'test_label',
		description: 'this is a test description about test',
		created_by: new mongoose.Types.ObjectId(),
		niche: 'Programming',
		tags: ['test-1', 'test-2', 'test-3']
	})
	await test_entry.save()
	const gen_test_capsules = () => {
		const capsule_array = []
		for (var i = 0; i < 7; i++) {
			capsule_array.push(mongoose.Types.ObjectId())
		}
		return capsule_array
	}
	const test_course = new courseModel({
		_id: '507f1f77bcf86cd799439011',
		name: 'test-course',
		desc: 'this is a test-description',
		created_by: new mongoose.Types.ObjectId(),
		capsules: gen_test_capsules()
	})
	await test_course.save()
})

test('Creating Capsule', async () => {
	const req_mock = {}
	req_mock.body = {
		yt_src: 'www.youtube.com/watch/test_video',
		label: 'test name',
		description: 'this is a test-description',
		niche: 'Programming',
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

test('Deleting Course', async () => {
	await deleteCourse('507f1f77bcf86cd799439011')
	const course = await courseModel.findById('507f1f77bcf86cd799439011')
	expect(course).toBeNull()
})

test('Deleting Capsule', async () => {
	await deleteCapsule('507f1f77bcf86cd799439011')
	const cap = await capsuleModel.findById('507f1f77bcf86cd799439011')
	expect(cap).toBeNull()
})