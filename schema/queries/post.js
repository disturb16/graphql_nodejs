const {GraphQLInt, GraphQLNonNull} = require('graphql')
const {getPostById} = require('../../config/utils')
const {PostType} = require('../types')

module.exports = {
  type: PostType,
  description: 'Gets an specific post.',
  args: {
    id: {type: new GraphQLNonNull(GraphQLInt)}
  },
  resolve: (_, args)=>{
    return getPostById(args.id)
  }
}