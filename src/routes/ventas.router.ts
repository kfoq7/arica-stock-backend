import { Router } from 'express'
import { createVenta, getVentas } from '../controllers/ventas.controller'

const router = Router()

router.get('/', getVentas)

router.post('/', createVenta)

export { router }
