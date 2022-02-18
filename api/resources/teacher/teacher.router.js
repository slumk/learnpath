import Router from 'express'
import { protectForTeacher } from '../../utils/auth/protectRoutes.js'
import { createCapsule, deleteCapsule, createCourse, deleteCourse } from './teacher.controller.js'

const teacherRouter = Router()
teacherRouter.use(async (req, res, next) => ( protectForTeacher(req, res, next) ) )
teacherRouter.post('/capsule/create/new', async (req, res) => {
	const status = await createCapsule(req)
	if (!status) {
		return res.status(400).end()
	}
	return res.status(202).end()
})

teacherRouter.delete('/capsule/delete/:lc_id', async (req, res) => {
	const status = await deleteCapsule(req.params.lc_id)
	if (status) {
		return res.status(202).end()
	}
	return res.status(400).end()
})

teacherRouter.post('/course/create/new', async (req, res) => {
	const is_created = await createCourse(req.body)
	if (!is_created) {
		return res.status(400).end()
	}
	return res.status(202).end()
})

teacherRouter.delete('/course/delete/:id', async (req, res) => {
	try {
		await deleteCourse(req.params.id)
		return res.status(202).end()
	} catch (error) {
		console.error(error)
		return res.status(400).end()
	}
})

export default teacherRouter