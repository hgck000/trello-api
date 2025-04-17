/* eslint-disable no-console */
import express from 'express'
import { CONNECT_DB, GET_DB } from '~/config/mongodb'


const START_SERVER = () => {
  const app = express()

  const hostname = 'localhost'
  const port = 8017

  app.get('/', (req, res) => {
    // console.log(await GET_DB().listCollection().toArray())

    res.end('<h1>Hello World!</h1><hr>')
  })

  app.listen(port, hostname, () => {
    console.log(`Hello Trung Quan Dev, I am running at ${hostname}:${port}/`)
  })
}

(async () => {
  try {
    console.log('1. Connecting to MGDB Cloud Atlas...')
    await CONNECT_DB()
    console.log('2. Connected to MGDB Cloud Atlas...')
    START_SERVER()
  } catch(error) {
    console.error(error)
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
