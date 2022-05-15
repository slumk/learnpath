import { fetchCapsules, fetchSingleCapsule, reportCapsule, searchCapsule } from './capsule.controller.js'

export const capsuleResolver = {
	Query: {
		getCapsules: async () => {
			return await fetchCapsules()
		},
		getCapsuleById: async (_, { id }, context) => {
			return await fetchSingleCapsule(id)
		}
	},
	Mutation: {
		reportCapsule: async (_, { id, reason }) => {
			return await reportCapsule(id, reason)
		},
		searchCapsule: async (_, { term }) => {
			return await searchCapsule(term)
		}
	}
}