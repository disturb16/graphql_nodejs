const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema')
const {tryDBConnection, connectToDB} = require('./config/db-connection')
const {logger} = require('./config/utils')

const app = express()

const port = process.env.PORT || 3030

app.listen(port, async ()=>{
  try {
    await tryDBConnection()
    await connectToDB()

    app.use('/graphql', graphqlHTTP({
      schema,
      graphiql: true,
      customFormatErrorFn: (err)=>{
        logger(err.message)
        return {
          message: err.message,
          code: err.originalError && err.originalError.code,   // <--
          locations: err.locations,
          path: err.path
        }
      }
    }))

    logger(`server started at port ${port}`)

  } catch (error) {
    logger(`Could start server: ${error}`)
    process.exit(1)
  }
})