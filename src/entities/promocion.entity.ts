import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm'
import { Producto } from './producto.entity'

@Entity()
export class Promocion {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  nombre: string

  @Column({ nullable: true })
  descripcion: string

  @Column('decimal')
  descuento: number

  @ManyToMany(() => Producto, producto => producto.promociones)
  productos: Producto[]
}
