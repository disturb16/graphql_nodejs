const {GraphQLInt, GraphQLNonNull} = require('graphql')
const {getAuthorById} = require('../../config/utils')
const {AuthorType} = require('../types')

module.exports = {
  type: AuthorType,
  description: 'Gets an specific author.',
  args: {
    id: {type: new GraphQLNonNull(GraphQLInt)}
  },
  resolve: async (_, args)=>{
    return getAuthorById(args.id)
  }
}