import { Request, Response } from 'express'
import { insertVenta } from '../services/ventas.service'
import { handleErrorResponse } from '../handle/error.handle'

export const createVenta = async (req: Request, res: Response) => {
  try {
    const venta = await insertVenta(req.body)

    res.status(200).json({
      data: venta
    })
  } catch (error) {
    handleErrorResponse(res, error)
  }
}
