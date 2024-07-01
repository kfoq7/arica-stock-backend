import { Between, MoreThan } from 'typeorm'
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

export const getAllVentas = async () => {
  return ventasRepository.find({
    relations: {
      detalleVenta: {
        producto: true
      }
    }
  })
}

export const getVentasInfo = async () => {
  const ventas = await ventasRepository.find()

  const today = new Date()
  today.setHours(0, 0, 0, 0) // Set time to 00:00:00.000

  const todayVentas = await ventasRepository.find({
    relations: { detalleVenta: true },
    where: { fecha: Between(today, new Date(today.getTime() + 24 * 60 * 60 * 1000)) }
  })

  const totalVentas = ventas.reduce((total, venta) => {
    return Number(venta.total) + Number(total)
  }, 0)
  const totalTodayVentas = todayVentas.reduce((total, venta) => {
    return Number(venta.total) + Number(total)
  }, 0)

  return {
    totalVentas,
    totalTodayVentas,
    totalTodayCount: todayVentas.length,
    todayVentas
  }
}
