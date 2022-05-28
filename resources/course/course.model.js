import mongoose from 'mongoose'

const courseSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			maxlength: 20  
		},
		desc: {
			type: String,
			required: true,
			maxlength: 300
		},
		created_by: {
			type: mongoose.Types.ObjectId,
			required: true,
			ref: 'teacher'
		},
		capsules: {
			type: [ mongoose.Types.ObjectId ],
			ref: 'Capsule',
			required: true
		},
		created_on: {
			type: Date,
			default: Date.now()
		},
		is_approved: {
			type: Boolean,
			default: false
		},
		report_count : {
			type: Number,
			default: 0,
		}
	}
)
export const courseModel = new mongoose.model('Course', courseSchema)