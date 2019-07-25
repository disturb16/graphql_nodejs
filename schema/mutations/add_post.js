const {sqlQuery, logger, getPostById} = require('../../config/utils')
const {PostType, PostInputType} = require('../types')

module.exports = {
  type: PostType,
  description: '',
  args:{
    post: {type: PostInputType}
  },
  resolve: async (_, {post})=>{

    try {
      const qry = 'insert into POSTS (title, content, author_id) values(:title, :content, :authorId)'
      let params = {...post}

      const result = await sqlQuery(qry, params)
      if (result.affectedRows == 0){
        throw('no rows affected')
      }

      return getPostById(result.insertId)

    } catch (error) {
      logger(error)
      return null
    }
  }
}