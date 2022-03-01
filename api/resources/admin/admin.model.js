import mongoose from 'mongoose'

const adminSchema = new mongoose.Schema(
	{
		admin_name: {
			type: String,
			required: true
		},
		admin_email: {
			type: String,
			required: true
		},
		admin_password: {
			type: String,
			required: true
		},
	}
)
export const adminModel = new mongoose.model('Admin', adminSchema)