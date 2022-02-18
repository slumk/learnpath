import { Router } from 'express'
import { createLearner, loginLearner } from './learner.auth.controller.js'

const authRouter = Router()

authRouter.post('/create', async (req, res) => {
	const { name, email, password, age } = req.body
	const token = await createLearner(name, email, password, age)
	if (token) {
		return res.status(202).cookie('key', token, { httpOnly: true }).end()
	}
	return res.status(400).end()  
})

authRouter.post('/login', async (req, res) => {
	const { email, password } = req.body
	const token = await loginLearner(email, password)
	if (token) {
		return res.status(200).cookie('key', token, { httpOnly: true }).end()
	}
	return res.status(400).end()
})

export default authRouter