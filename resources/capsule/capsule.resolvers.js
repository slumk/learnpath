import { fetchCapsules, fetchSingleCapsule, reportCapsule, bookmarkCapsule, removeBookmark, upvoteCapsule, minusUpvoteCapsule, commentCapsule } from './capsule.controller.js'

export const capsuleResolver = {
	Query: {
		getCapsules: async (_, {input, filter}) => {
			return await fetchCapsules(input, filter)
		},
		getCapsuleById: async (_, { id }) => {
			return await fetchSingleCapsule(id)
		}
	},
	Mutation: {
		reportCapsule: async (_, { id, reason }) => {
			return await reportCapsule(id, reason)
		},
		bookmarkCapsule: async (_, { capsuleId }, { user_id }) => {
			if (!user_id){
				return false
			}
            return await bookmarkCapsule(user_id, capsuleId)
        },
        removeBookmark: async (_, { capsuleId }, { user_id }) => {
			if (!user_id){
				return false
			}
            return await removeBookmark(user_id, capsuleId)
        },
		upvoteCapsule: async(_, { capsuleId }, { user_id }) => {
			if (!user_id){
				return false
			}
            return await upvoteCapsule(user_id, capsuleId)
        },
        minusUpvoteCapsule: async (_, { capsuleId }, { user_id }) => {
			if (!user_id){
				return false
			}
            return await minusUpvoteCapsule(user_id, capsuleId)
        },
		commentCapsule: async (_, { capsuleId, text }, { user_id }) => {
            return await commentCapsule(user_id, capsuleId, text)
        },
	}
}