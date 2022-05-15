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
		niche: {
			type: String,
			required: true,
			enum: [
				'Programming',
				'Mathematics',
				'Science',
				'English',
				'History',
				'Art',
				'Music',
				'Drama',
				'Physical Education',
				'Foreign Languages',
				'Other'
			]
		},
		portfolio: {
			type: String,
		},
		report_count: {
			type: Number,
			default: 0
		},
		report_reason: {
			type: String,
			enum: [
				'Fraudulent Content',
				'Defamation',
				'Pornographic Content',
				'Child Abuse',
				'Other',
				''
			],
			default: ''
		},
		is_banned: {
			type: Boolean,
			default: false
		}
	}, { timestamps: true })


export const teacherModel = new mongoose.model('Teacher', teacherSchema)