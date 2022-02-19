import { test_db_connect } from '../../../utils/db_connect'
import { capsuleModel } from '../../capsule/capsule.model'
import mongoose from 'mongoose'
import { bookmarkCapsule, downvoteCapsule, minusDownvoteCapsule, minusUpvoteCapsule, removeBookmark, requestAccountDeletion, upvoteCapsule, viewLearnerInfo } from '../learner.controller'
import { learnerModel } from '../learner.model'

beforeAll(async () => {
	await test_db_connect()
	await capsuleModel.deleteMany()
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
	await learnerModel.deleteMany()
	const test_user = new learnerModel({
		_id: '620fa734dd24eb1316beacff',
		name: 'test-user',
		email: 'testuser@gmail.com',
		gender: 'M',
		password: 'mytestpassword',
		age: 25,        
	})
	await test_user.save()
})

test('Upvoting Capsule', async () => {
	await upvoteCapsule('620fa734dd24eb1316beabff')
	const capsule = await capsuleModel.findById('620fa734dd24eb1316beabff')
	expect(capsule.upvote_count).toBe(1)
})

test('Un-Upvotes a capsule', async () => {
	await minusUpvoteCapsule('620fa734dd24eb1316beabff')
	const capsule = await capsuleModel.findById('620fa734dd24eb1316beabff')
	expect(capsule.upvote_count).toBe(0)
})

test('Downvotes capsule', async () => {
	await downvoteCapsule('620fa734dd24eb1316beabff')
	const capsule = await capsuleModel.findById('620fa734dd24eb1316beabff')
	expect(capsule.downvote_count).toBe(1)
})

test('Un-Downvotes a capsule', async () => {
	await minusDownvoteCapsule('620fa734dd24eb1316beabff')
	const capsule = await capsuleModel.findById('620fa734dd24eb1316beabff')
	expect(capsule.downvote_count).toBe(0)
})

test('Request account deletion', async () => {
	await requestAccountDeletion('620fa734dd24eb1316beacff')
	const user = await learnerModel.findById('620fa734dd24eb1316beacff').lean()
	expect(user.requested_delete).toBeTruthy()
})

test('Bookmarks Capsule', async () => {
	await bookmarkCapsule('620fa734dd24eb1316beacff', '620fa734dd24eb1316beabff')
	const user = await learnerModel.findById('620fa734dd24eb1316beacff').lean()
	expect(user.bookmarks[0]).toBeTruthy()
})

test('Un-Bookmarks Capsule', async () => {
	await removeBookmark('620fa734dd24eb1316beacff', '620fa734dd24eb1316beabff')
	const user = await learnerModel.findById('620fa734dd24eb1316beacff').lean()
	expect(user.bookmarks).toStrictEqual([])
})

test('Fetching Learner Details', async () => {
	const learner = await viewLearnerInfo('620fa734dd24eb1316beacff')
	expect(learner).not.toBe([])
	expect(learner).not.toBeUndefined()
	expect(learner).toBeTruthy()
})