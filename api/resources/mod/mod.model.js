import mongoose from 'mongoose'
const modSchema = new mongoose.Schema(
	{
		learner_id: {
			type: mongoose.Types.ObjectId,
			ref: 'Learner',
			required: true
		},
		is_approved: {
			type: Boolean,
			default: false,
		},
		place: {
			type: String,
			required: true
		},
		age: {
			type: Number,
			required: true
		},
	}
)

export const modModel = mongoose.model('Moderators', modSchema)