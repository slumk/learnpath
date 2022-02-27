import mongoose from 'mongoose'

const teacherSchema = new mongoose.Schema(
	{
		learner_id: {
			type: mongoose.Types.ObjectId,
			ref: 'Learner',
			required: true
		},
		is_approved: {
			type: Boolean,
			default: false
		},
		teacher_name: {
			type: String,
			required: true,
			maxlength: 15
		},
		teacher_desc: {
			type: String,
			required: true,
			maxlength: 300
		},
		portfolio: {
			type: String,
		},
		report_count: {
			type: Number,
			default: 0
		},
		is_banned: {
			type: Boolean,
			default: false
		},
		created_at: {
			type: Date,
			default: Date.now()
		}
	})


export const teacherModel = new mongoose.model('Teacher', teacherSchema)