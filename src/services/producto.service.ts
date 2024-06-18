import { AppDataSource } from '../config/database'
import { Producto } from '../entities/producto.entity'

const productoRepository = AppDataSource.getRepository(Producto)

export const getAllProductos = async (): Promise<Producto[]> => {
  return productoRepository.find({
    relations: { categoria: true }
  })
}

export const insertProducto = async (data: Producto): Promise<Producto> => {
  return productoRepository.save(data)
}

export const updateProductoById = async (productoId: number, data: Producto): Promise<Producto> => {
  const productoToUpdate = await productoRepository.findOneBy({ id: productoId })

  if (!productoToUpdate) throw new Error('Producto no encontrado')

  productoRepository.merge(productoToUpdate, data)

  return productoRepository.save(productoToUpdate)
}
