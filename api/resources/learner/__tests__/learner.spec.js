import { test_db_connect } from '../../../utils/db_connect'
import { capsuleModel } from '../../capsule/capsule.model'
import mongoose from 'mongoose'
import { requestUpgradeToTeacher, bookmarkCapsule, minusUpvoteCapsule, removeBookmark, requestAccountDeletion, upvoteCapsule, viewLearnerInfo, enrollCourse, reportTeacher, commentCapsule, reportComment } from '../learner.controller'
import { learnerModel } from '../learner.model'
import { teacherModel } from '../../teacher/teacher.model'
import { commentModel } from '../comment.model'

beforeAll(async () => {
	await test_db_connect()
	await capsuleModel.deleteMany() // clearing capsule model
	// inserting a test entry in database
	// setting capsule as approved and visible
	// for testing purposes
	await commentModel.deleteMany()
	const test_entry = new capsuleModel({
		_id: '620fa734dd24eb1316beabff',
		yt_src: 'somerandomlinkman',
		label: 'test_label',
		niche: 'Programming',
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
		region: 'Asia Pacific',
		age: 25,        
	})
	await test_user.save()
	await teacherModel.deleteMany() // clearing teacher model
	const test_teacher = new teacherModel({
		_id: '620fb734dd24eb1316beacff',
		teacher_name: 'teacher',
		niche: 'Programming',
		teacher_desc: 'this is a test description',
		portfolio: 'instagram.com/testhandle',
		learner_id: new mongoose.Types.ObjectId()
	})
	await test_teacher.save()
})

test('Upvoting Capsule', async () => {
	await upvoteCapsule('620fa734dd24eb1316beacff','620fa734dd24eb1316beabff')
	const capsule = await capsuleModel.findById('620fa734dd24eb1316beabff')
	const user = await learnerModel.findById('620fa734dd24eb1316beacff')
	expect(await capsule.upvote_count).toBe(1)
	expect(await user.upvoted_capsules).not.toBe([])
})

test('Un-Upvotes a capsule', async () => {
	await minusUpvoteCapsule('620fa734dd24eb1316beacff', '620fa734dd24eb1316beabff')
	const capsule = await capsuleModel.findById('620fa734dd24eb1316beabff')
	expect(capsule.upvote_count).toBe(0)
	const user = await learnerModel.findById('620fa734dd24eb1316beacff')
	expect(await user.upvoted_capsules).toStrictEqual([])
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

test('Requests Upgrade To Teacher', async () => {
	const req_mock = {}
	req_mock.body = {
		name: 'teacher',
		desc: 'this is a test description',
		publichandle: 'instagram.com/testhandle',
		niche: 'Programming'
	}
	req_mock.user_id = new mongoose.Types.ObjectId()
	await requestUpgradeToTeacher(req_mock)
	const teacher = await teacherModel.find({ learner_id: req_mock.user_id})
	expect(teacher.is_approved).toBeFalsy()
})

test('Enrolling in course', async () => {
	const some_random_course_id = new mongoose.Types.ObjectId()
	await enrollCourse('620fa734dd24eb1316beacff', some_random_course_id)
	const learner = await learnerModel.findById('620fa734dd24eb1316beacff')
	expect(learner.enrolled_courses).not.toBe([])
})

test('Request Account Deletion', async () => {
	await requestAccountDeletion('620fa734dd24eb1316beacff')
	const learner = await learnerModel.findById('620fa734dd24eb1316beacff')
	expect(learner.requested_delete).toBeTruthy()
})

test('Reporting Teacher', async () => {
	await reportTeacher('620fb734dd24eb1316beacff')
	const teacher = await teacherModel.findById('620fb734dd24eb1316beacff')
	expect(teacher.report_count).toBe(1)
})

test('Commenting Capsule', async () => {
	await commentCapsule('620fa734dd24eb1316beacff'
		, '620fa734dd24eb1316beabff'
		, 'This is the worst capsule ever created in history'
	)
	await commentCapsule('620fa734dd24eb1316beacff'
		, '620fa734dd24eb1316beabff'
		, 'Boom Boom'
	)
	const capsule = await capsuleModel.findById('620fa734dd24eb1316beabff')
		.populate({
			path: 'comments',
			populate: {
				path: 'learner_id',
				select: 'name'
			}
		})
	expect(capsule.comments).not.toBe([])
	expect(capsule.comments[0].learner_id).not.toBeNull()
})

test('Reporting Comment', async () => {
	const dummyComment = await commentModel.create({
		learner_id: '620fa734dd24eb1316beacff',
		comment_text: 'This is a test comment'
	})
	await reportComment(dummyComment._id)
	let updatedComment = await commentModel.findById(dummyComment._id)
	expect(updatedComment.report_count).toBe(1)
	await reportComment(dummyComment._id)
	updatedComment = await commentModel.findById(dummyComment._id)
	expect(updatedComment.report_count).toBe(2)
})