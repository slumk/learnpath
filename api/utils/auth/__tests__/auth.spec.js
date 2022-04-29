import { learnerModel } from '../../../resources/learner/learner.model.js'
import { teacherModel } from '../../../resources/teacher/teacher.model.js'
import { test_db_connect } from '../../db_connect.js'
import { createLearner, loginLearner } from '../learner.auth.controller.js'

beforeAll(async () => {
	await test_db_connect()
	await learnerModel.deleteMany()
	await teacherModel.deleteMany()
})

test('Creating a dummy learner', async () => {
	const isCreated = await createLearner(
		'test_name',
		'test@gmail.com',
		'test_password',
		30,
		'M',
		'Asia Pacific'
	)
	const learner = await learnerModel.findOne({
		email: 'test@gmail.com'
	})
	expect(isCreated).toBeTruthy()
	expect(learner).not.toBe([])
})

test('logs in dummy learner', async () => {
	const returnedToken = await loginLearner(
		'test@gmail.com',
		'test_password'
	)
	expect(returnedToken).not.toBeNull()
	expect(returnedToken).toBeTruthy()
	expect(returnedToken).not.toBe({})
})