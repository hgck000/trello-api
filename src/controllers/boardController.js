import { StatusCodes } from 'http-status-codes'
import { boardService } from '~/services/boardService'

const createNew = async (req, res, next) => {
  try {
    // console.log('req.body: ', req.body)
    // console.log('req.query: ', req.query)
    // console.log('req.params: ', req.params)
    // console.log('req.files: ', req.files)
    // console.log('req.cookies: ', req.cookies)
    // console.log('req.jwtDecoded: ', req.jwtDecoded)

    // Điều hướng dữ liệu sang tầng Service
    const createdBoard = await boardService.createNew(req.body)

    // throw new ApiError(StatusCodes.BAD_GATEWAY, 'This is a bad request from boardController!')
    // Có kết quả thì trả về phía client
    res.status(StatusCodes.CREATED).json(createdBoard)
  } catch (error) { next(error) }
}

const getDetail = async (req, res, next) => {
  try {
    const boardId = req.params.id
    // console.log('boardId: ', boardId)
    const board = await boardService.getDetail(boardId)
    // console.log('board: ', board)
    res.status(StatusCodes.OK).json(board)
  } catch (error) { next(error) }
}

const update = async (req, res, next) => {
  try {
    const boardId = req.params.id
    const updatedBoard = await boardService.update(boardId, req.body)
    res.status(StatusCodes.OK).json(updatedBoard)
  } catch (error) { next(error) }
}

export const boardController = {
  createNew,
  getDetail,
  update
}
