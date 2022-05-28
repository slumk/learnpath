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
			enum: ['M', 'F','Others'],
			required: true
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
			required: true,
			enum: ['AsiaPacific', 'Americas', 'Europe', 'MiddleEast']
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
		upvoted_capsules: {
			type: [mongoose.Types.ObjectId],
			ref: 'Capsule'
		},
		enrolled_courses: {
			type: [mongoose.Types.ObjectId],
			ref: 'Course'
		},
		requested_delete: {
			type: Boolean,
			default: false
		}
	}, { timestamps: true })
export const learnerModel = new mongoose.model('Learner', learnerSchema)