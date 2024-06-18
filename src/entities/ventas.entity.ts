import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { VentasProductos } from './ventas-producto.entity'

@Entity()
export class Ventas {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  fecha: Date

  @Column('decimal')
  total: number

  @OneToMany(() => VentasProductos, ventasProductos => ventasProductos.ventas)
  ventasProductos: VentasProductos[]
}
