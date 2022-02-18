import { test_db_connect } from '../../../utils/db_connect'
import { capsuleModel } from '../../capsule/capsule.model'
import mongoose from 'mongoose'
import { approveCapsule, approveCourse } from '../mod.controller'
import { courseModel } from '../../course/course.model'

beforeAll(async () => {
	await test_db_connect()
	//clears database
	await capsuleModel.deleteMany()
	await courseModel.deleteMany()
	// inserting a test entry in database
	var test_entry = new capsuleModel({
		_id: '620fa734dd24eb1316beabff',
		yt_src: 'somerandomlinkman',
		label: 'test_label',
		description: 'this is a test description about test',
		created_by: new mongoose.Types.ObjectId(),
		tags: ['test-1', 'test-2', 'test-3'],
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
	})
	await test_entry.save()
})

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
