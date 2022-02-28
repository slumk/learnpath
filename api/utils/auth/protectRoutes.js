import { learnerModel } from '../../resources/learner/learner.model.js'
import { modModel } from '../../resources/mod/mod.model.js'
import { teacherModel } from '../../resources/teacher/teacher.model.js'
import { decipherToken } from './jwtOps.js'

export const protectForMod = async (req, res, next) => {
	const token = await req.cookies.key.user_token
	if (!token) {
		return res.status(401).end()
	}
	const payload = await decipherToken(token)
	if (!payload) {
		return res.status(401).end()
	}
	const is_mod = await modModel.find({ learner_id: payload.gotcha.user_id })
	if (is_mod.toString()) {
		req.user_id = await payload.gotcha.user_id
		req.mod_id = await is_mod[0]._id
		console.log('attached andis with req')
		return next()
	}
	return res.status(401).end()
	
}

// export const protectForAdmin = async (req, res, next) => {
// 	const token = await req.cookies.key.user_token
// 	if (!token) {
// 		return res.status(401).end()
// 	}
// 	const payload = await decipherToken(token)
// 	if (!payload) {
// 		return res.status(401).end()
// 	}
// 	next()
// }

export const protectForLearner = async (req, res, next) => {
	try {
		const token = await req.cookies.key.user_token
		if (!token) {
			return res.status(401).end()
		}
		const payload = await decipherToken(token)
		if (!payload) {
			return res.status(401).end()
		}
		const is_learner = await learnerModel.findById(payload.gotcha.user_id)
		if (is_learner.toString()) {
			req.user_id = payload.gotcha.user_id
			return next()
		}
		return res.status(401).end()	
	} catch (error) {
		return res.status(400).end()
	}
}

export const protectForTeacher = async (req, res, next) => {
	const token = await req.cookies.key.user_token
	if (!token) {
		return res.status(401).end()
	}
	const payload = await decipherToken(token)
	if (!payload) {
		return res.status(401).end()
	}
	const is_teacher = await teacherModel.find({ learner_id: payload.gotcha.user_id, is_approved: true })
	if (is_teacher.toString()) {
		req.teacher_id = is_teacher[0]._id
		req.user_id = payload.gotcha.user_id
		return next()
	}
	return res.status(401).end()
}