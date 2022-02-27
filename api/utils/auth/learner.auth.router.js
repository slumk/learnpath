import { Router } from 'express'
import { createLearner, loginLearner } from './learner.auth.controller.js'

const authRouter = Router()

authRouter.post('/create/account', async (req, res) => {
	const { name, email, password, age } = req.body
	const token = await createLearner(name, email, password, age)
	if (token) {
		return res.status(202).end()
	}
	return res.status(400).end()  
})

authRouter.post('/login', async (req, res) => {
	const { email, password } = req.body
	const token = await loginLearner(email, password)
	if (token) {
		return res.status(200)
			.cookie('key', token, { httpOnly: true, sameSite: true, expires: new Date(Date.now() + 7200000) })
			.cookie('learnpath-key', true, {expires: new Date(Date.now() + 7200000), sameSite: true})
			.json({})
			.end()
	}
	return res.status(400).end()
})

authRouter.post('/logout', async (req, res) => {
	return res.status(200)
		.clearCookie('learnpath-key', {sameSite: true})
		.clearCookie('key', {sameSite: true})
		.end()
})

export default authRouter