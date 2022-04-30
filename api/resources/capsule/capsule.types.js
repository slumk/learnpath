import { gql } from 'apollo-server-core'

export const typeDefs = gql`
    type Tag {
        tag: String
    }
    type Comment {
        id: ID!,
        comment_text: String,
        commented_date: String,
        report_count: Int,
        report_reason: String
    }
    type Capsule {
        _id: ID!
        label: String!,
        yt_src: String!,
        niche: String!,
        description: String!,
        created_by: String,
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
        capsules: [Capsule]!
        capsule(id: String!): Capsule!
    }
    type Mutation {
        reportCapsule(id: String!, reason: String!):Boolean!
        searchCapsule(term: String!):[Capsule]
    }
`