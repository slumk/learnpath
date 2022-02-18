import jwt from 'jsonwebtoken'

export const makeToken = (id) => {
	const token = jwt.sign({ user_id: id },
		process.env.JWT_SECRET, 
		{ expiresIn : process.env.JWTexp }
	)
	return token
}

export const decipherToken = async (token) => {
	const value = jwt.verify(token, process.env.JWT_SECRET, (err, decoded_shit) => {
		if (err instanceof jwt.TokenExpiredError) {
			console.log('Token expired')
			return false
		}
		else if (err instanceof jwt.JsonWebTokenError) {
			console.log('Token error')
			return false
		}
		else if (err instanceof jwt.NotBeforeError) {
			console.log('Token is not before')
			return false
		}
		return { gotcha : decoded_shit }
	})
	return value
}
