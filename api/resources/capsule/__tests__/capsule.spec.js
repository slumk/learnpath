import { test_db_connect } from '../../../utils/db_connect'
import { capsuleModel } from '../capsule.model'
import mongoose from 'mongoose'
import { fetchCapsules, fetchSingleCapsule, reportCapsule, searchCapsule } from '../capsule.controller'

beforeAll(async () => {
	await test_db_connect()
	await capsuleModel.deleteMany()
	console.log('database cleared for test')
	// inserting a test entry in database
	// setting capsule as approved and visible
	// for testing purposes
	const test_entry = new capsuleModel({
		_id: '620fa734dd24eb1316beabff',
		yt_src: 'somerandomlinkman',
		label: 'test_label',
		description: 'this is a test description about test',
		created_by: new mongoose.Types.ObjectId(),
		tags: ['test-1', 'test-2', 'test-3'],
		is_approved: true,
		is_visible: true
	})
	await test_entry.save()
	console.log('test entry inserted into DB')
}) 

test('Fetching All Capsules', async () => {
	const capsules_recieved = await fetchCapsules()
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