import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Ventas } from './ventas.entity'
import { Producto } from './producto.entity'

@Entity()
export class DetalleVenta {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Ventas, ventas => ventas.detalleVenta)
  venta: Ventas

  @ManyToOne(() => Producto, producto => producto.detalleVenta)
  producto: Producto

  @Column('int')
  cantidad: number

  @Column('decimal', { precision: 5, scale: 2 })
  precio: number
}
