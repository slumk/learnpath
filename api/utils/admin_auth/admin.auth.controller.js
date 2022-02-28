import { adminModel } from '../../resources/admin/admin.model'
import bcrypt from 'bcryptjs'

export const loginAdmin = async (email, password) => {
	try {
		const admin = await adminModel.find({ 
			admin_email: email
		}).select('password')
		if (admin) {
			const match = await bcrypt.compare(password, admin[0].password)
			if (match) {
				return true
			}
			return false
		}
	} catch (error) {
		return false
	}
}