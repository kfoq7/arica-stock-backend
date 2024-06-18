import { Request, Response } from 'express'
import { getAllPromocion } from '../services/promocion.service'
import { handleErrorResponse } from '../handle/error.handle'

export const getPromociones = async (_req: Request, res: Response) => {
  try {
    const productos = await getAllPromocion()

    res.status(200).json({
      data: productos
    })
  } catch (error) {
    handleErrorResponse(res, error)
  }
}
