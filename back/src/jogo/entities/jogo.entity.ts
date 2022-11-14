import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Jogo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  categoria: string;

  @Column()
  regras: string;
}
