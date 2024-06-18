import { AppDataSource } from '../config/database'
import { Ventas } from '../entities/ventas.entity'
import { Producto } from '../entities/producto.entity'
import { DetalleVenta } from '../entities/detalle-venta.entity'

const ventasRepository = AppDataSource.getRepository(Ventas)
const productoRepository = AppDataSource.getRepository(Producto)
const detalleVentaRepository = AppDataSource.getRepository(DetalleVenta)

export const insertVenta = async (ventaData: Ventas) => {
  const { detalleVenta, ...restVentaData } = ventaData

  const venta = ventasRepository.create({
    ...restVentaData,
    fecha: new Date(),
    total: 0
  })
  await ventasRepository.save(venta)

  const detalleVentas = await Promise.all(
    detalleVenta.map(async ({ cantidad, producto, ...restDetalleVenta }) => {
      const detalleVenta = detalleVentaRepository.create({
        ...restDetalleVenta,
        precio: cantidad * producto.precio,
        cantidad,
        producto,
        venta
      })
      await detalleVentaRepository.save(detalleVenta)

      // Update product stock
      const productToUpdate = (await productoRepository.findOneBy({ id: producto.id }))!
      productoRepository.merge(productToUpdate, { stock: productToUpdate.stock - cantidad })
      await productoRepository.save(productToUpdate)

      return detalleVenta
    })
  )

  venta.total = detalleVentas.reduce((total, venta) => total + venta.precio, 0)
  await ventasRepository.save(venta)

  return venta
}
