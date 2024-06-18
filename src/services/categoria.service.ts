import { AppDataSource } from '../config/database'
import { Categoria } from '../entities/categoria.entity'

const categoriaRespository = AppDataSource.getRepository(Categoria)

export const getAllCategories = async (): Promise<Categoria[]> => {
  return categoriaRespository.find()
}
