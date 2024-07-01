import { Router } from 'express'
import { createVenta, getInfoVentas, getVentas } from '../controllers/ventas.controller'

const router = Router()

router.get('/', getVentas)

router.get('/info', getInfoVentas)

router.post('/', createVenta)

export { router }
