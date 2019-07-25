const {GraphQLSchema, GraphQLObjectType} = require('graphql')
const posts = require('./queries/posts')
const author = require('./queries/author')
const post = require('./queries/post')

const addPost = require('./mutations/add_post')
const addComment = require('./mutations/add_comment')

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'query',
    description: 'Root query',
    fields: {
      posts,
      post,
      author
    }
  }),

  mutation: new GraphQLObjectType({
    name: 'mutation',
    fields:{
      addPost,
      addComment
    }
  })
  
})

module.exports = schema