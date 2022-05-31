import jwt from 'jsonwebtoken'
import config from '../../config.js'
export const makeToken = (id) => {
	const token = jwt.sign({ user_id: id },
		config.JWT_SECRET, 
		{ expiresIn : config.JWTExp }
	)
	return token
}

export const decipherToken = async (token) => {
	const value = jwt.verify(token, config.JWT_SECRET, (err, user) => {
		if (err) {
			return false
		}
		return user
	})
	return value
}
