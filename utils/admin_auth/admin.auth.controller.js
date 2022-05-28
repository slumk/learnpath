import { adminModel } from '../../resources/admin/admin.model.js'
import bcrypt from 'bcryptjs'

export const loginAdmin = async (email, password) => {
	try {
		const admin = await adminModel.find({ 
			admin_email: email
		}).select('admin_password')
		if (admin) {
			const match = await bcrypt.compare(password, admin[0].admin_password)
			if (match) {
				return true
			}
			return false
		}
	} catch (error) {
		console.error(error)
		return false
	}
}