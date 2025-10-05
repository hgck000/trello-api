import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { BOARD_TYPES } from '~/utils/constants'

const creatNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().messages({
      'any.required': 'Title is required (quangminhdev)',
      'string.empty': 'Title is not allowed to be empty (quangminhdev)',
      'string.min': 'Title min 3 characters (quangminhdev)',
      'string.max': 'Title max 50 characters (quangminhdev)',
      'string.trim': 'Title must not have leading or trailing whitespace'
    }),
    description: Joi.string().required().min(3).max(256).trim().strict(),
    type: Joi.string().valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE).required()
  })

  try {
    // console.log('req.body: ', req.body)

    // Chỉ định abortEarly false để trường hợp nhiều lỗi validation thì trả về tất cả
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    // Validation dữ liệu xong hợp lệ thì cho request đi tiếp sang controller
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

const update = async (req, res, next) => {
  // Lưu ý không require trong trường hợp update
  const correctCondition = Joi.object({
    title: Joi.string().min(3).max(50).trim().strict(),
    description: Joi.string().min(3).max(256).trim().strict(),
    type: Joi.string().valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE)
  })

  try {
    // Chỉ định abortEarly false để trường hợp nhiều lỗi validation thì trả về tất cả
    // Đối với trường hợp update, cho phép Unknow để không cần đẩy 1 số field lên
    await correctCondition.validateAsync(req.body, {
      abortEarly: false,
      allowUnknown: true
    })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}


export const boardValidation = {
  creatNew,
  update
}
