import { test_db_connect } from '../../../utils/db_connect'
import { capsuleModel } from '../capsule.model'
import { commentModel } from '../../learner/comment.model'
import mongoose from 'mongoose'
import { fetchCapsules, fetchSingleCapsule, reportCapsule, searchCapsule } from '../capsule.controller'
import { teacherModel } from '../../teacher/teacher.model'
import { learnerModel } from '../../learner/learner.model'

beforeAll(async () => {
	await test_db_connect()
	await capsuleModel.deleteMany()
	// inserting a test entry in database
	// setting capsule as approved and visible
	// for testing purposes
	const awesome_object_id = new mongoose.Types.ObjectId()
	const test_teacher = new teacherModel({
		_id: awesome_object_id,
		teacher_name: 'teacher',
		niche: 'Programming',
		teacher_desc: 'this is a test description',
		portfolio: 'instagram.com/testhandle',
		learner_id: new mongoose.Types.ObjectId()
	})
	await test_teacher.save()
	const test_user = await learnerModel.create({
		name: 'test-user',
		email: 'testuser1@gmail.com',
		gender: 'M',
		password: 'mytestpassword',
		region: 'Asia Pacific',
		age: 25,        
	})
	const dummyComment = await commentModel.create({
		learner_id: test_user._id,
		comment_text: 'This is a test comment'
	})
	const test_entry = new capsuleModel({
		_id: '620fa734dd24eb1316beabff',
		yt_src: 'somerandomlinkman',
		label: 'test_label',
		comments: [ dummyComment._id ],
		description: 'this is a test description about test',
		created_by: awesome_object_id,
		tags: ['test-1', 'test-2', 'test-3'],
		is_approved: true,
		niche: 'Programming',
		is_visible: true
	})
	await test_entry.save()
}) 

test('Fetching All Capsules', async () => {
	const capsules_recieved = await fetchCapsules()
	expect(capsules_recieved).toBeTruthy()
	expect(capsules_recieved).not.toBe([])
})

test('Fetching Single Capsule Details', async () => {
	const capsule = await fetchSingleCapsule('620fa734dd24eb1316beabff')
	expect(capsule).not.toBe([])
	expect(capsule).toBeTruthy()
})

test('reporting capsule', async () => {
	await reportCapsule('620fa734dd24eb1316beabff')
	const capsule = await capsuleModel.findById('620fa734dd24eb1316beabff')
	expect(capsule.report_count).toBe(1)
})

test('searching for capsule', async () => {
	var capsules_got_by_search = await searchCapsule('test_label')
	expect(capsules_got_by_search).not.toBe([])
	capsules_got_by_search = await searchCapsule('termwhichnotexists')
	expect(capsules_got_by_search).toBeFalsy()
})