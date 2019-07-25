const {sqlQuery, logger} = require('../../config/utils')
const {CommentType, CommentInputType} = require('../types')

module.exports = {
  type: CommentType,
  description: '',
  args:{
    comment: {type: CommentInputType}
  },
  resolve: async (_, {comment})=>{
    try {
      const qry = 'insert into COMMENTS (name, content, post_id) values(:name, :content, :postId)'
      const params = {...comment}
  
      const result = await sqlQuery(qry, params)

      if (result.affectRows == 0){
        throw('no rows affected')
      }
  
      const qryComment = 'select * from COMMENTS where id = :commentId'
      const paramsComment = {commentId: result.insertId}
      const resultComment = await sqlQuery(qryComment, paramsComment)
      return resultComment[0]
    } catch (error) {
      logger(error)
      return null
    }
  }
}