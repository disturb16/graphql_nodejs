const {GraphQLList} = require('graphql')
const {sqlQuery} = require('../../config/utils')
const {PostType} = require('../types')

module.exports = {
  type: new GraphQLList(PostType),
  description: 'Gets the list of available posts.',
  args: {},
  resolve: async function(){
    const qry = 'select * from POSTS'
    return await sqlQuery(qry)
  }
}