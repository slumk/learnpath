import { viewLearnerInfo, requestAccountDeletion, upvoteCapsule, minusUpvoteCapsule, reportTeacher, bookmarkCapsule, removeBookmark, commentCapsule, reportComment, requestUpgradeToTeacher } from './learner.controller.js'

export const learnerResolver = {
    Query: {
        getLearnerInfo : async (_,__, context) => {
            return await viewLearnerInfo(context.user_id)
        }
    },
    Mutation: {
        requestAccountDeletion: async (_, __, context) => {
            return await requestAccountDeletion(context.user_id)
        },
        upvoteCapsule: async(_, { capsuleId }, { user_id }) => {
            return await upvoteCapsule(user_id, capsuleId)
        },
        minusUpvoteCapsule: async (_, { capsuleId }, { user_id }) => {
            return await minusUpvoteCapsule(user_id, capsuleId)
        },
        reportTeacher: async (_, { teacherId }, { user_id }) => {
            return await reportTeacher(teacherId)
        },
        bookmarkCapsule: async (_, { capsuleId }, { user_id }) => {
            return await bookmarkCapsule(user_id, capsuleId)
        },
        removeBookmark: async (_, { capsuleId }, { user_id }) => {
            return await removeBookmark(user_id, capsuleId)
        },
        commentCapsule: async (_, { capsuleId, text }, { user_id }) => {
            return await commentCapsule(user_id, capsuleId, text)
        },
        reportComment: async (_, { commentId, reason }, { user_id }) => {
            return await reportComment(comment_id, reason)
        },
        requestUpgradeToTeacher: async (_, { input }, { user_id }) => {
            return await requestUpgradeToTeacher(input, user_id)
        }
    }
}