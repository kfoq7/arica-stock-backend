import { Request, Response } from 'express'
import { getAllVentas, getVentasInfo, insertVenta } from '../services/ventas.service'
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

export const getVentas = async (req: Request, res: Response) => {
  try {
    const ventas = await getAllVentas()

    res.status(200).json({
      data: ventas
    })
  } catch (error) {
    handleErrorResponse(res, error)
  }
}

export const getInfoVentas = async (_req: Request, res: Response) => {
  try {
    const infoVentas = await getVentasInfo()

    return res.status(200).json({
      data: infoVentas
    })
  } catch (error) {
    handleErrorResponse(res, error)
  }
}
