export const validateEmail = (email) => {
	const exp = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/
	if (exp.test(email)) {
		return true
	}
	return false
}