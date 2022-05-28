import { Router } from 'express'
import { fetchCourses, fetchSingleCourse, reportCourse } from './course.controller.js'
const courseRouter = Router()

courseRouter.get('/', async (req, res) => {
	const data = await fetchCourses()
	if (!data) {
		return res.status(404).end()
	}
	return res.status(200).json(data).end()
})

courseRouter.get('/course/:id', async (req, res) => {
	try {
		const data = await fetchSingleCourse(req.params.id)
		if (!data) {
			return res.status(404).end()
		}
		return res.status(200).json(data).end()
	} catch (error) {
		console.error(error)
		return res.status(404).end()
	}
})

courseRouter.put('/report/course/:id', async (req, res) => {
	try {
		const isReported = await reportCourse(req.params.id)
		if (isReported) {
			return res.status(202).end()
		}
		return res.status(400).end()
	}
	catch (err) {
		console.error(err)
		return res.status(400).end()
	}
})

export default courseRouter