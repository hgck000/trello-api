/* eslint-disable no-console */
import express from 'express'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from '~/config/environment'
import { APIs_V1 } from '~/routes/v1'

const START_SERVER = () => {
  const app = express()

  app.use('/v1', APIs_V1)
  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`3. Hello ${env.AUTHOR} Dev, I am running at ${env.APP_HOST}:${env.APP_PORT}/`)
  })

  // Thực hiện cleanup trước khi dừng server
  exitHook(() => {
    console.log('4. Server is shutting down...')
    CLOSE_DB()
    console.log ('5. Disconected from MongoDB Cloud Atlas')
  })
}

(async () => {
  try {
    console.log('1. Connecting to MGDB Cloud Atlas...')
    await CONNECT_DB()
    console.log('2. Connected to MGDB Cloud Atlas...')
    START_SERVER()
  } catch (error) {
    console.error('Error connecting to MongoDB: ', error)
    process.exit(0)
  }
})()

// CONNECT_DB()
//   .then(() => console.log('Connected to MongoDB Cloud Atlas!'))
//   .then(() => START_SERVER())
//   .catch(error => {
//     console.error(error)
//     process.exit(0)
//   })
