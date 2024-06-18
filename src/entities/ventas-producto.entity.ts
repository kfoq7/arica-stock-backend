import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Ventas } from './ventas.entity'
import { Producto } from './producto.entity'

@Entity()
export class VentasProductos {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Ventas, ventas => ventas.ventasProductos)
  ventas: Ventas

  @ManyToOne(() => Producto, producto => producto.ventasProductos)
  producto: Producto

  @Column('int')
  cantidad: number

  @Column('decimal')
  precio: number
}
