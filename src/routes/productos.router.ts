import { Router } from 'express'
import { createProducto, getProductos, updateProducto } from '../controllers/productos.controller'

const router = Router()

router.get('/', getProductos)

router.post('/', createProducto)

router.put('/:id/update', updateProducto)

export { router }
