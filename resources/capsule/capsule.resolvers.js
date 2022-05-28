import { fetchCapsules, fetchSingleCapsule, reportCapsule } from './capsule.controller.js'

export const capsuleResolver = {
	Query: {
		getCapsules: async (_, {input, filter}) => {
			return await fetchCapsules(input, filter)
		},
		getCapsuleById: async (_, { id }, context) => {
			return await fetchSingleCapsule(id)
		}
	},
	Mutation: {
		reportCapsule: async (_, { id, reason }) => {
			return await reportCapsule(id, reason)
		}
	}
}