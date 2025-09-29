/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'

const creatNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().messages({
      'any.required': 'Title is required (quangminhdev)',
      'string.empty': 'Title is not allowed to be empty (quangminhdev)',
      'string.min': 'Title min 3 characters (quangminhdev)',
      'string.max': 'Title max 50 characters (quangminhdev)',
      'string.trim': 'Title must not have leading or trailing whitespace'
    }),
    description: Joi.string().required().min(3).max(256).trim().strict()
  })

  try {
    // console.log('req.body: ', req.body)

    // Chỉ định abortEarly false để trường hợp nhiều lỗi validation thì trả về tất cả
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    // Validation dữ liệu xong hợp lệ thì cho request đi tiếp sang controller
    next()
  } catch (error) {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: new Error(error).message
    })
  }
}

export const boardValidation = {
  creatNew
}