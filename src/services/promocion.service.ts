import { AppDataSource } from '../config/database'
import { Promocion } from '../entities/promocion.entity'

const productoRepository = AppDataSource.getRepository(Promocion)

export const getAllPromocion = async (): Promise<Promocion[]> => {
  return productoRepository.find()
}
