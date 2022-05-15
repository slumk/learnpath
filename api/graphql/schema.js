import { capsuleTypeDefs } from '../resources/capsule/capsule.types.js'
import { gql } from 'apollo-server-core'

let typeDef = []
const typesArray = [
	capsuleTypeDefs
]
typesArray.forEach(eachTypeDef => {
	typeDef.push(eachTypeDef)
})
export const fullTypeDefs = gql(`
    ${typeDef.join('\n')}
`)