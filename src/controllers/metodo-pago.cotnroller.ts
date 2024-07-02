import { Request, Response } from 'express'
import { getAllMetodoPago } from '../services/metodo-pago.service'
import { handleErrorResponse } from '../handle/error.handle'

export const getMetodoPagos = async (_req: Request, res: Response) => {
  try {
    const metodoPago = await getAllMetodoPago()

    res.status(200).json({
      data: metodoPago
    })
  } catch (error) {
    handleErrorResponse(res, error)
  }
}
