import { Request, Response } from 'express'
import { getAllProductos, insertProducto, updateProductoById } from '../services/producto.service'
import { handleErrorResponse } from '../handle/error.handle'

export const getProductos = async (_req: Request, res: Response) => {
  try {
    const productos = await getAllProductos()

    res.status(200).json({
      data: productos
    })
  } catch (error) {
    handleErrorResponse(res, error)
  }
}

export const createProducto = async (req: Request, res: Response) => {
  try {
    const producto = await insertProducto(req.body)

    res.status(201).json({
      data: producto
    })
  } catch (error) {
    handleErrorResponse(res, error)
  }
}

export const updateProducto = async (req: Request, res: Response) => {
  try {
    const producto = await updateProductoById(Number(req.params.id), req.body)

    res.status(200).json({
      data: producto
    })
  } catch (error) {
    handleErrorResponse(res, error)
  }
}
