import { Request, Response } from 'express'
import { getAllCategories } from '../services/categoria.service'
import { handleErrorResponse } from '../handle/error.handle'

export const getCategorias = async (_req: Request, res: Response) => {
  try {
    const productos = await getAllCategories()

    res.status(200).json({
      data: productos
    })
  } catch (error) {
    handleErrorResponse(res, error)
  }
}
