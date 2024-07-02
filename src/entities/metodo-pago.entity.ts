import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class MetodoPago {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  nombre: string

  @Column({ default: true })
  estaActivo: boolean
}
