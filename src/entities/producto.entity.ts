import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Categoria } from './categoria.entity'
import { Promocion } from './promocion.entity'
import { VentasProductos } from './ventas-producto.entity'

@Entity()
export class Producto {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ type: 'varchar', length: 100 })
  nombre: string

  @Column()
  precio: number

  @Column({})
  stock: number

  @ManyToOne(() => Categoria)
  categoria: Categoria

  @ManyToMany(() => Promocion, promocion => promocion.productos)
  @JoinTable()
  promociones: Promocion[]

  @OneToMany(() => VentasProductos, ventasProductos => ventasProductos.producto)
  ventasProductos: VentasProductos[]
}