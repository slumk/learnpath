import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema(
	{
		learner_id: {
			type: mongoose.Types.ObjectId,
			ref: 'Learner',
			required: true
		},
		comment_text: {
			type: String,
			required: true
		},
		commented_date: {
			type: Date,
			default: Date.now()
		},
		report_count: {
			type: Number,
			default: 0
		},
		report_reason: {
			type: String,
			enum: [
				'Adult Content',
				'Violent or Repulsive Content',
				'Spam or Misleading',
				''
			],
			default: ''
		}
	}
)
export const commentModel = new mongoose.model('Comments', commentSchema)
