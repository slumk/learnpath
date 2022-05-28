import jwt from 'jsonwebtoken'

export const makeToken = (id) => {
	const token = jwt.sign({ user_id: id },
		process.env.JWT_SECRET, 
		{ expiresIn : process.env.JWTexp }
	)
	return token
}

export const decipherToken = async (token) => {
	const value = jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
		if (err) {
			return false
		}
		return user
	})
	return value
}
