const mariadb = require('mariadb')

const host = process.env.DB_HOST
const user = process.env.DB_USER
const password = process.env.DB_PASS
const database = process.env.DB_NAME

function disconnectFromDB() {
  return new Promise(async (resolve, reject)=>{
    try {
      if (global.connectionPool != null) {
        await global.connectionPool.end()
        global.connectionPool = null
        resolve()
      }
    } catch (error) {
      reject(error)
    }
  })
}

function connectToDB() {
  return new Promise(async (resolve, reject)=>{
    try {
      if (global.connectionPool != null) {
        resolve()
      }
    
      global.connectionPool = await mariadb.createPool({
        host,
        user,
        password,
        database,
        connectionLimit: 5
      })
      
      resolve()
    } catch (error) {
      reject(error)
    }
  })
}

function tryDBConnection() {
  return new Promise(async (resolve, reject)=>{
    try {
      const conn = await mariadb.createConnection({
        host, 
        user,
        password,
        database,
      })
  
      await conn.end()
      resolve()
    } catch (error) {
      reject(error)
    }
  }) 
}

module.exports = {
  tryDBConnection,
  connectToDB,
  disconnectFromDB
}