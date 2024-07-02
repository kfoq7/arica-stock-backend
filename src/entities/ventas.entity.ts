import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm'
import { DetalleVenta } from './detalle-venta.entity'
import { Cliente } from './cliente.entity'
import { Empleado } from './empleado.entity'
import { MetodoPago } from './metodo-pago.entity'

@Entity()
export class Ventas {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  fecha: Date

  @Column('decimal', { precision: 5, scale: 2 })
  total: number

  @ManyToOne(() => Cliente)
  cliente: Cliente

  @ManyToOne(() => Empleado)
  empleado: Empleado

  @ManyToOne(() => MetodoPago)
  metodoPago: MetodoPago

  @OneToMany(() => DetalleVenta, detalleVenta => detalleVenta.venta, { cascade: true })
  detalleVenta: DetalleVenta[]
}
