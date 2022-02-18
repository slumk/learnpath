import { Router } from 'express'
import { protectForLearner } from '../../utils/auth/protectRoutes.js'
import { upvoteCapsule, downvoteCapsule, bookmarkCapsule, viewLearnerInfo, removeBookmark, requestUpgradeToTeacher, minusDownvoteCapsule, minusUpvoteCapsule } from './learner.controller.js'
const learnerRouter = Router()

learnerRouter.use( async (req, res, next) => ( protectForLearner(req, res, next) ))

learnerRouter.put('/upvote/:id', async (req, res) => {
	const status = await upvoteCapsule(req.params.id)
	if (!status) {
		return res.status(400).end()
	}
	return res.status(202).end()
})

learnerRouter.put('/upvote/minus/:id', async (req, res) => {
	const status = await minusUpvoteCapsule(req.params.id)
	if (!status) {
		return res.status(400).end()
	}
	return res.status(202).end()
})

learnerRouter.put('/downvote/:id', async (req, res) => {
	const status = await downvoteCapsule(req.params.id)
	if (!status) {
		return res.status(400).end()
	}
	return res.status(202).end()
})

learnerRouter.put('/downvote/minus/:id', async (req, res) => {
	const status = await minusDownvoteCapsule(req.params.id)
	if (!status) {
		return res.status(400).end()
	}
	return res.status(202).end()
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
		return res.status(200).send({ data: info }).end()
	}
	return res.status(404).end()
})

learnerRouter.post('/request/upgrade', async (req, res) => {
	const status = await requestUpgradeToTeacher(req)
	if (status) {
		return res.status(202).end()
	}
	return res.status(400).end()
})
export default learnerRouter
