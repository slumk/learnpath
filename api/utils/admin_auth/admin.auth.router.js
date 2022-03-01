import { Router } from 'express'
import { loginAdmin } from './admin.auth.controller.js'

const adminAuthRouter = Router()

adminAuthRouter.post('/login', async (req, res) => {
	const { email, password } = req.body
	const isLogged = await loginAdmin(email, password)
	if (isLogged) {
		return res.status(200).end()
	}
	return res.status(400).end()
})

export default adminAuthRouter