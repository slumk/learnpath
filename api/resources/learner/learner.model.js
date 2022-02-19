import mongoose from 'mongoose'
import { validateEmail } from './validators/validate_email.js'

const learnerSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			maxlength: 20
		},
		email: {
			type: String,
			required: true,
			unique: true,
			validate: validateEmail
		},
		gender: {
			type: String,
			enum: ['M', 'F', 'Trans','Others']
		},
		password: {
			type: String,
			required: true
			// need to add a validator function for password
		},
		age: {
			type: Number,
			required: true,
			max: 100,
			min: 13
		},
		region: {
			type: String,
			enum: ['Asia Pacific', 'Americas', 'Europe', 'Middle East']
		},
		// is_email_verified: {
		// 	type: Boolean,
		// 	default: false
		// },
		// hash_for_verify: {
		// 	type: String,
		// 	// default: generateHashForNewLearner()
		// },
		bookmarks: {
			type: [mongoose.Types.ObjectId],
			ref: 'Capsule'			
		},
		is_mod: {
			type: Boolean,
			default: false
		},
		is_admin: {
			type: Boolean,
			default: false
		},
		enrolled_courses: {
			type: [mongoose.Types.ObjectId],
			ref: 'Course'
		},
		requested_delete: {
			type: Boolean,
			default: false
		},
		is_banned: {
			type: Boolean,
			default: false
		},
		joined_date: {
			type: Date,
			default: Date.now()
		}
	}
)
export const learnerModel = new mongoose.model('Learner', learnerSchema)