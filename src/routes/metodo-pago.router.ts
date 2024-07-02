import { Router } from 'express'
import { getMetodoPagos } from '../controllers/metodo-pago.cotnroller'

const router = Router()

router.get('/', getMetodoPagos)

export { router }
