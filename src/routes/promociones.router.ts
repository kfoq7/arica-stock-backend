import { Router } from 'express'
import { getPromociones } from '../controllers/promocion.controller'

const router = Router()

router.get('/', getPromociones)

export { router }
