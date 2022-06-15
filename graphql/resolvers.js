import { capsuleResolver } from '../resources/capsule/capsule.resolvers.js'
import { commentResolver } from '../resources/capsule/comment/comment.resolver.js'
export const fullResolvers = {
	Query: {
		...capsuleResolver.Query
	},
	Mutation: {
		...capsuleResolver.Mutation
	}
}
