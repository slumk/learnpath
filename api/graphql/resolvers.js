import { capsuleResolver } from '../resources/capsule/capsule.resolvers.js'
export const fullResolvers = {
	Query: {
		...capsuleResolver.Query
	},
	Mutation: {
		...capsuleResolver.Mutation
	}
}
