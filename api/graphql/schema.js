import { capsuleTypeDefs } from '../resources/capsule/capsule.types.js'
import { learnerTypeDefs } from '../resources/learner/learner.types.js'
import { learnerAuthTypeDefs } from '../utils/auth/learner.auth.types.js'
import { gql } from 'apollo-server-core'

let typeDef = []
const typesArray = [
	learnerAuthTypeDefs,
	capsuleTypeDefs,
	learnerTypeDefs
]
typesArray.forEach(eachTypeDef => {
	typeDef.push(eachTypeDef)
})
export const fullTypeDefs = gql(`
    ${typeDef.join('\n')}
`)