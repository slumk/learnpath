import mongoose from 'mongoose'

const capsuleSchema = new mongoose.Schema(
	{
		yt_src: {
			type: String,
			required: true,
			unique: true
		},
		label: {
			type: String,
			required: true,
			maxlength: 40,
			text: true
		},
		description: {
			type: String,
			required: true,
			maxlength: 200,
			text: true
		},
		created_by: {
			type: mongoose.Types.ObjectId,
			required: true,
			ref: 'Teacher'
		},
		tags: { type: [String] , text: true},
		upvote_count: {
			type: Number,
			default: 0
		},
		report_count: {
			type: Number,
			default: 0
		},
		is_approved: {
			type: Boolean,
			default: false
		},
		is_visible: {
			type: Boolean,
			default: false
		},
		created_date: {
			type: Date,
			default: Date.now()
		}
	})
export const capsuleModel = new mongoose.model('Capsule', capsuleSchema)
