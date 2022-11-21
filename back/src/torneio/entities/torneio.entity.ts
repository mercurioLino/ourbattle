import { Jogo } from 'src/jogo/entities/jogo.entity';
import { Partida } from 'src/partida/entities/partida.entity';
import { Organizacao } from 'src/usuario/entities/organizacao.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'tipo' } })
export class Torneio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  data: string;

  @Column()
  hora: string;

  @Column()
  qtdParticipantes: number;

  @Column()
  premiacao: number;

  @Column()
  regras: string;

  @Column()
  status: 'Inscrições Abertas' | 'Em Andamento' | 'Concluído';

  @Column()
  tipo: 'equipe' | 'individual';
  
  @OneToMany(() => Partida, (partida) => partida.torneio, {
    eager: true,
  })
  partidas: Partida[];

  @ManyToOne(() => Organizacao, { 
    eager: true
  })
  organizacao: Organizacao;

  @ManyToOne(() => Jogo, {
    eager: true
  })
  jogo: Jogo;
}
