const userTypeDefs = `
    type User {
        firstName: String
        lastName: String
        email: String!
        phoneNumber: String
        gender: String
        role: String!
        isVerified: Boolean!
        createdAt: String!
        updatedAt: String!
    }
    input UserFilter {
        searchText: String
        email: String
        phone: String
        gender: String
        activeFromDate: String
    }
    type Query {
        getAllUsers(input: PageInput!, filter: UserFilter!): [User]
    }
`