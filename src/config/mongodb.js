/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

const MONGODB_URI = 'mongodb+srv://hgck000:1BbLdVsBlGXpkTJW@cluster0-quangminhdev.iqyvgm9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0-QuangMinhDev'
// const MONGODB_URI = 'mongodb+srv://hgck000:1BbLdVsBlGXpkTJW@cluster0-quangminhdev.iqyvgm9.mongodb.net/?appName=Cluster0-QuangMinhDev'

const DATABASE_NAME = 'trello-quangminh-mern-stack-pro'

import { MongoClient, ServerApiVersion } from 'mongodb'

// Khởi tạo đối tượng trelloDatabaseInstance ban đầu là null (Vì chưa connect)
let trelloDatabaseInstance = null

const mongoClientInstance = new MongoClient(MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})


export const CONNECT_DB = async () => {
  // Gọi kết nối tới Mongo Atlas với URI đã khai báo trong thân của mongoClientInstance
  await mongoClientInstance.connect()

  // Kết nối thành công thì lấy ra Database theo tên và gán ngược nó lại vào biến trelloDatabaseInsatance ở trên của chúng ta
  trelloDatabaseInstance = mongoClientInstance.db(DATABASE_NAME)
}

export const GET_DB = () => {
  if (!trelloDatabaseInstance) throw new Error('Must connect to Database first!')
}