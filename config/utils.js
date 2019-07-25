/**
 * QueryParam
 * @typedef {Object} QueryParam
 * @property {string} key 
 * @property {any} value
 */

/**
 * 
 * @param {string} _query 
 * @param {QueryParam[]} _params
 */
function sqlQuery(_query = '', _params = null){
  return new Promise(async (resolve, reject)=>{

    try {
      if (!global.connectionPool) {
        reject("no database connection")
      }

      const conn = await global.connectionPool.getConnection()
    
      const rows = await conn.query({
        namedPlaceholders: true,
        sql: _query
      }, _params)

      conn.release()
      resolve(rows)

    } catch (error) {
      reject(error)
    }
  })
}

/**
 * 
 * @param {number} postId 
 */
async function getPostById(postId){
  try {
    const qry = 'select * from POSTS where id = :postId'
    const params = {postId}
    const result = await sqlQuery(qry, params)
    return result[0]
  } catch (error) {
    logger(error)
    return {}
  }
}

/**
 * 
 * @param {number} authorId 
 */
async function getAuthorById(authorId){
  try {
    const qry = 'select * from AUTHORS where id = :authorId'
    const params = {authorId}
    const result = await sqlQuery(qry, params)
    return result[0]
  } catch (error) {
    logger(error)
    return {}
  }
}

/**
 * 
 * @param {number} authorId 
 */
async function getPostsByAuthor(authorId){
  try {
    const qry = `select * from POSTS where author_id = :authorId`
    const params = {authorId}
    return await sqlQuery(qry, params)
  } catch (error) {
    logger(error)
    return []
  }
}

/**
 * 
 * @param {number} postId 
 */
async function getCommentsByPost(postId){
  try {
    const qry = `select * from COMMENTS where post_id = :postId`
    const params = {postId}
    return await sqlQuery(qry, params)
  } catch (error) {
    logger(error)
    return []
  }
}

const logger = (msg)=>{
  const dt = new Date()
  console.log(`[${dt.toUTCString()}] ${msg}`)
}

module.exports = {
  sqlQuery,
  logger,
  getAuthorById,
  getPostById,
  getPostsByAuthor,
  getCommentsByPost
}