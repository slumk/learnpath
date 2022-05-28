import { test_db_connect } from '../../../utils/db_connect'
import { addMod, fetchAllLearners } from '../admin.controllers'
// import mongoose from 'mongoose'
import { modModel } from '../../mod/mod.model'
import { learnerModel } from '../../learner/learner.model'
// import { teacherModel } from '../../teacher/teacher.model'

beforeAll(async () => {
	await test_db_connect()
	const test_learner = new learnerModel({
		_id: '621b11c07e95871600dbd57f',
		name: 'sasasasa',
		email: 'boom@gmail.com',
		password: 'bullshit$$test',
		age: 32,
		region: 'Asia Pacific',
		gender: 'M'
	})
	await test_learner.save()
})

test('Registering Mod', async () => {
	await addMod('621b11c07e95871600dbd57f')
	const mod = modModel.findById('621b11c07e95871600dbd57f')
	expect(mod).not.toBe([])
	expect(mod).toBeTruthy()
})

test('Fetching all learners', async () => {
	const learners = await fetchAllLearners()
	expect(learners.data).not.toBeUndefined()
	expect(learners.data).not.toBe([])
	expect(learners).toBeTruthy()
})