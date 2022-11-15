import { Organizacao } from './../../usuario/entities/organizacao.entity';
import { Funcionario } from 'src/usuario/entities/funcionario.entity';
import { Jogador } from 'src/usuario/entities/jogador.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Atendimento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descricao: string;

  @Column()
  status: 'Em Aberto' | 'Resolvendo' | 'Concluído';

  @ManyToOne(() => Jogador, {
    eager: true,
  })
  jogador: Jogador;

  @ManyToOne(() => Funcionario, {
    eager: true,
  })
  organizacao: Organizacao;

  @ManyToOne(() => Funcionario, {
    eager: true,
  })
  funcionario?: Funcionario;

  @Column()
  feedback?: string;
}
