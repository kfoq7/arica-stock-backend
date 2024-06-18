import { Router } from 'express'
import { createVenta } from '../controllers/ventas.controller'

const router = Router()

router.post('/', createVenta)

export { router }
