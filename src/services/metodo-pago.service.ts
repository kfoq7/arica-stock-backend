import { AppDataSource } from '../config/database'
import { MetodoPago } from '../entities/metodo-pago.entity'

const metodoPagoRespository = AppDataSource.getRepository(MetodoPago)

export const getAllMetodoPago = async (): Promise<MetodoPago[]> => {
  return metodoPagoRespository.find()
}
