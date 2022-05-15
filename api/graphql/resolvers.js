import { capsuleResolver } from '../resources/capsule/capsule.resolvers.js'
import { learnerResolver } from '../resources/learner/learner.resolver.js'
export const fullResolvers = {
	Query: {
		...capsuleResolver.Query,
		...learnerResolver.Query
	},
	Mutation: {
		...capsuleResolver.Mutation,
		...learnerResolver.Mutation
	}
}
