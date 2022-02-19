import { Router } from 'express'
import { protectForMod } from '../../utils/auth/protectRoutes.js'
import { approveCapsule, approveCourse, approveTeacher, fetchPendingCapsules, fetchPendingTeachers, fetchPendingCourses, fetchReportedCapsules, fetchReportedCourses, fetchReportedTeachers } from './mod.controller.js'

const modRouter = Router()

modRouter.use(async (req, res, next) => ( await protectForMod(req, res, next)))

modRouter.get('/fetch/pending/teachers', async (req, res) => {
	const pendingTeachers = await fetchPendingTeachers()
	if (!pendingTeachers) {
		return res.status(404).end()
	}
	return res.status(200).json( { data: pendingTeachers } ).end()
})

modRouter.get('/fetch/pending/capsules', async (req, res) => {
	const pendingCapsules = await fetchPendingCapsules()
	if (!pendingCapsules) {
		return res.status(404).end()
	}
	return res.status(200).json( { data: pendingCapsules } ).end()
})

modRouter.get('/fetch/pending/courses', async (req, res) => {
	const pendingCourses = await fetchPendingCourses()
	if (!pendingCourses) {
		return res.status(404).end()
	}
	return res.status(200).json( { data: pendingCourses } ).end()
})

modRouter.put('/approve/capsule/:id', async (req, res) => {
	try {
		await approveCapsule(req.params.id)
		return res.status(202).end()
	} catch (error) {
		console.error(error)
		return res.status(400).end()
	}
})

modRouter.put('/approve/course/:id', async (req, res) => {
	const is_approved = await approveCourse(req.params.id)
	if (!is_approved) {
		return res.status(400).end()
	}
	return res.status(200).end()
})

modRouter.put('/approve/teacher/:id', async (req, res) => {
	const is_approved = await approveTeacher(req.params.id)
	if (is_approved) {
		return res.status(202).end()
	}
	return res.status(400).end()
})

modRouter.get('/fetch/reported/:what', async (req, res) => {
	switch (req.params.what) {
	case 'capsules': {
		const reported_capsules = await fetchReportedCapsules()
		if (reported_capsules) {
			return res.status(200).json(reported_capsules).end()
		}
		return res.status(404).end()
	}
	case 'courses': {
		const reported_courses = await fetchReportedCourses()
		if (reported_courses) {
			return res.status(200).json(reported_courses).end()
		}
		return res.status(404).end()
	}
	case 'learners': {
		const reported_teacher = await fetchReportedTeachers()
		if (reported_teacher) { 
			return res.status(200).json(reported_teacher).end()
		}
		return res.status(404).end()
	}
	default:
		return res.status(404).end()
	}
})

export default modRouter