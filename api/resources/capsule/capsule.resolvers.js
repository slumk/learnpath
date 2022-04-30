import { fetchCapsules, fetchSingleCapsule, reportCapsule, searchCapsule } from './capsule.controller.js'

export const resolvers = {
	Query: {
		capsules: async () => {
			return await fetchCapsules()
		},
		capsule: async (_, { id }) => {
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