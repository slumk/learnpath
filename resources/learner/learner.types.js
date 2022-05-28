export const learnerTypeDefs = `
    input TeacherInfo {
        name: String!,
        desc: String!, 
        publichandle: String!,
        niche: String!
    }
    type Learner {
        _id: ID!,
        name: String!,
        email: String!,
        gender: String!,
        age: Int!,
        region: String!,
        bookmarks: [Capsule],
        upvoted_capsules: [Capsule],
        requested_delete: Boolean!,
        createdAt: String
    }

    type Query {
        getLearnerInfo: Learner!
    }

    type Mutation {
        requestUpgradeToTeacher(input: TeacherInfo): Boolean!
        requestAccountDeletion: Boolean!
        upvoteCapsule(capsuleId: ID!): Boolean!
        minusUpvoteCapsule(capsuleId: ID!): Boolean!
        reportTeacher(teacherId: ID!): Boolean!
        bookmarkCapsule(capsuleId: ID!): Boolean!
        removeBookmark(capsuleId: ID!): Boolean!
        commentCapsule(capsuleId: ID!, text: String!): Boolean!
        reportComment(commentId: ID!, reason: String!): Boolean!
    }
`