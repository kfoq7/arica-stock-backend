import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Empleado {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  nombre: string

  @Column({ nullable: true })
  telefono: number

  @Column({ nullable: true })
  direccion: string
}
