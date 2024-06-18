import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Categoria {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  nombre: string

  @Column({ nullable: true })
  descripcion: string

  @Column({ default: true })
  estaActivo: boolean
}
