// import { learnerModel } from '../../resources/learner/learner.model.js'
// import { modModel } from '../../resources/mod/mod.model.js'
// import { teacherModel } from '../../resources/teacher/teacher.model.js'
import { decipherToken } from './jwtOps.js'

export const checkAuthStatus = async (authString) => {
	const token = authString.split("Bearer ")[1]
	const user = await decipherToken(token)
	if (user) {
		return user
	}
	return ""
}