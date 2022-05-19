export const capsuleTypeDefs = `
    type Comment {
        _id: ID!,
        comment_text: String,
        createdAt: String,
        report_count: Int,
        report_reason: String
    }
    type Teacher {
        _id: ID
        teacher_name: String
        niche: String
    }
    type Capsule {
        _id: ID!
        label: String!,
        yt_src: String!,
        niche: String,
        description: String!,
        created_by: Teacher,
        tags: [String],
        upvote_count: Int,
        comments: [Comment],
        report_count: Int,
        report_reason: String,
        is_approved: Boolean,
        is_visible: Boolean,
        created_date: String
    }
    type Query {
        getCapsules: [Capsule]!
        getCapsuleById(id: ID!): [Capsule]!
    }
    type Mutation {
        reportCapsule(id: ID!, reason: String!):Boolean!
        searchCapsule(term: String!):[Capsule]
    }
`