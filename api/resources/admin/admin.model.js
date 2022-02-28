import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

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

adminSchema.pre('save', async (next) => {
	this.password = await bcrypt.hash(this.password, 10)
		.then((hash) => {
			return hash
		})
	next()
})

export const adminModel = new mongoose.Model('Admin', adminSchema)