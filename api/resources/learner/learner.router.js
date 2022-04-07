import { Router } from 'express'
import { protectForLearner } from '../../utils/auth/protectRoutes.js'
import { fetchLearnerRelations ,upvoteCapsule, bookmarkCapsule, viewLearnerInfo, removeBookmark, requestUpgradeToTeacher, minusUpvoteCapsule, enrollCourse, reportTeacher, commentCapsule } from './learner.controller.js'
const learnerRouter = Router()

learnerRouter.use( async (req, res, next) => ( protectForLearner(req, res, next) ))

learnerRouter.put('/upvote/:id', async (req, res) => {
	const status = await upvoteCapsule(req.user_id ,req.params.id)
	if (!status) {
		return res.status(400).end()
	}
	return res.status(202).end()
})

learnerRouter.put('/upvote/minus/:id', async (req, res) => {
	const status = await minusUpvoteCapsule(req.user_id ,req.params.id)
	if (!status) {
		return res.status(400).end()
	}
	return res.status(202).end()
})

learnerRouter.post('/comment/:id', async (req, res) => {
	const { comment_text } = req.body
	const wasCommentSuccessful = await commentCapsule(req.user_id, req.params.id, comment_text)
	if (wasCommentSuccessful) {
		return res.status(200).end()
	}
	return res.status(404).end()
})

learnerRouter.put('/bookmark/:id', async (req, res) => {
	const status = await bookmarkCapsule(req.user_id, req.params.id)
	if (status) {
		return res.status(202).end()
	}
	return res.status(400).end()
})

learnerRouter.put('/bookmark/remove/:id', async (req, res) => {
	const status = await removeBookmark(req.user_id, req.params.id)
	if (status) {
		return res.status(202).end()
	}
	return res.status(400).end()
})

learnerRouter.get('/my/info', async (req, res) => {
	const info = await viewLearnerInfo(req.user_id)
	if (info) {
		return res.status(200).json( info ).end()
	}
	return res.status(404).end()
})

learnerRouter.get('/my/relations', async (req, res) => {
	const info = await fetchLearnerRelations(req.user_id)
	if (await info) {
		return res.status(200).json(info).end()
	}
	return res.status(400).end()
})

learnerRouter.post('/request/upgrade', async (req, res) => {
	const status = await requestUpgradeToTeacher(req)
	if (status) {
		return res.status(202).end()
	}
	return res.status(400).end()
})

learnerRouter.put('/enroll/:course_id', async (req, res) => {
	const status = await enrollCourse(req.user_id, req.params.course_id)
	if (status) {
		return res.status(202).end()
	}
	return res.status(400).end()
})

learnerRouter.put('/report/teacher/:teacher_id', async (req, res) => {
	const status = await reportTeacher(req.params.teacher_id)
	if (status) {
		return res.status(200).end()
	}
	return res.status(400).end()
})

export default learnerRouter
