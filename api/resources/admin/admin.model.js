import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const adminSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true
		},
		password: {
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