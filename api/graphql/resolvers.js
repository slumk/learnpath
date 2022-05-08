import { capsuleResolver } from '../resources/capsule/capsule.resolvers.js'
import { guestAccess } from '../utils/auth/auth.controller.js'
export const resolvers = {
	Query: {
		...guestAccess(capsuleResolver.Query)
	},
	Mutation: {
		...guestAccess(capsuleResolver.Mutation)
	}
}
