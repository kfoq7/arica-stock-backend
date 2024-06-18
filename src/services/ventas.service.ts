import { AppDataSource } from '../config/database'
import { Ventas } from '../entities/ventas.entity'
import { DetalleVenta } from '../entities/detalle-venta.entity'

const ventasRepository = AppDataSource.getRepository(Ventas)
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

      return detalleVenta
    })
  )

  venta.total = detalleVentas.reduce((total, venta) => total + venta.precio, 0)
  await ventasRepository.save(venta)

  return venta
}
