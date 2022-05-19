export const learnerAuthTypeDefs = `
    input LoginInput{
        email: String!,
        password: String!
    }
    enum Gender {
        M
        F
        Others
    }
    enum Region {
        AsiaPacific
        Americas
        Europe
        MiddleEast
    }
    input SignupInput{
        name: String!
        email: String!
        gender: Gender!
        password: String!
        age: Int!
        region: Region!
    }
    type LoginResponse{
        isSuccessful: Boolean!
        token: String
    }
    type Mutation {
        createAccount(input: SignupInput!): Boolean!
    }
    type Query {
        login(input: LoginInput!): LoginResponse! 
    }
`