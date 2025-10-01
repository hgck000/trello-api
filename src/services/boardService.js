/* eslint-disable no-useless-catch */

import { slugify } from '~/utils/formatters'
import { boardModel } from '~/models/boardModel'

const createNew = async (reqBody) => {
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }

    // Gọi tới tầng Model để xử lý lưu bản ghi newBoard vào DB
    const createdBoard = await boardModel.createNew(newBoard)
    // console.log('createdBoard: ', createdBoard)

    // Lấy bản ghi board sau khi gọi
    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId)
    // console.log('getNewBoard: ', getNewBoard)

    // Làm thêm các xử lý logic khác với các Collection khác tùy đặc thù dự án
    // Bắn email, notification, log, ... về cho admin khi có 1 cái board mới được tạo

    // Trả kết quả về, trong service luôn phải có return
    return getNewBoard
  } catch (error) { throw error }
}

export const boardService = {
  createNew
}
