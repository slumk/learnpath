import { createLearner, loginLearner } from "./learner.auth.controller.js"

export const learnerAuthResolver = {
    Query: {
        login: async (_, { input }) => {
            return await loginLearner(input)
        }
    },
    Mutation: {
        createAccount: async (_, { input }) => {
            return await createLearner(input)
        }
    }
}