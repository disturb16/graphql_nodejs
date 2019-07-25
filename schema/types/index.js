const {
  GraphQLObjectType,GraphQLInt,GraphQLString, 
  GraphQLList, GraphQLNonNull, GraphQLInputObjectType} = require('graphql')
const {getPostsByAuthor, getAuthorById, getCommentsByPost} = require('../../config/utils')

const AuthorType = new GraphQLObjectType({
  name: 'AuthorType',
  description: 'Details of post owner.',
  fields: ()=> ({
    id: {type: GraphQLInt},
    name: {type: GraphQLString},
    email: {type: GraphQLString},
    posts: {
      type: new GraphQLList(PostType),
      resolve: async (author)=>{
        return getPostsByAuthor(author.id)
      }
    }
  })
})

const PostType = new GraphQLObjectType({
  name: "PostType",
  description: 'Details of the post.',
  fields: ()=>({
    id: {type: GraphQLInt},
    title: {type: GraphQLString},
    content: {type: GraphQLString},
    autor: {
      type: AuthorType,
      resolve: async (post)=>{
        return getAuthorById(post.author_id)
      }
    },
    comments: {
      type: new GraphQLList(CommentType),
      resolve: async (post)=>{
        return getCommentsByPost(post.id)
      }
    }
  })
})

const CommentType = new GraphQLObjectType({
  name: "CommentType",
  description: 'Details of the comment.',
  fields: ()=>({
    id: {type: GraphQLInt},
    name: {type: GraphQLString},
    content: {type: GraphQLString}
  })
})

const PostInputType = new GraphQLInputObjectType({
  name:'PostInput',
  fields:{
    title:{type: new GraphQLNonNull(GraphQLString)},
    content: {type: new GraphQLNonNull(GraphQLString)},
    authorId: {type: new GraphQLNonNull(GraphQLInt)}
  }
})

const CommentInputType = new GraphQLInputObjectType({
  name:'CommentInput',
  fields:{
    name:{type: new GraphQLNonNull(GraphQLString)},
    content: {type: new GraphQLNonNull(GraphQLString)},
    postId: {type: new GraphQLNonNull(GraphQLInt)}
  }
})

module.exports = {
  AuthorType,
  PostType,
  CommentType,
  PostInputType,
  CommentInputType
}
