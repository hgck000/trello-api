import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from '~/config/environment'

// Khởi tạo đối tượng trelloDatabaseInstance ban đầu là null (Vì chưa connect)
let trelloDatabaseInstance = null

const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
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
  trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)

  // console.log('[✅] CONNECT_DB thành công')
  // return trelloDatabaseInstance
}

// Đóng kết nối tới DB khi cần
export const CLOSE_DB = async () => {
  await mongoClientInstance.close()
}

export const GET_DB = () => {
  if (!trelloDatabaseInstance) throw new Error('Must connect to Database first!')
  return trelloDatabaseInstance
}

