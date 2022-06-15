import { capsuleTypeDefs } from '../resources/capsule/capsule.types.js'
import { commentTypeDefs } from '../resources/capsule/comment/comment.types.js'
import { gql } from 'apollo-server-core'

let typeDef = []
const typesArray = [
	capsuleTypeDefs,
	commentTypeDefs
]
typesArray.forEach(eachTypeDef => {
	typeDef.push(eachTypeDef)
})
export const fullTypeDefs = gql(`
    ${typeDef.join('\n')}
`)