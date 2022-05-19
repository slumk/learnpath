import { capsuleResolver } from '../resources/capsule/capsule.resolvers.js'
import { learnerResolver } from '../resources/learner/learner.resolver.js'
import { learnerAuthResolver } from '../utils/auth/learner.auth.resolver.js'
export const fullResolvers = {
	Query: {
		...capsuleResolver.Query,
		...learnerResolver.Query,
		...learnerAuthResolver.Query
	},
	Mutation: {
		...capsuleResolver.Mutation,
		...learnerResolver.Mutation,
		...learnerAuthResolver.Mutation
	}
}
