import { Usuario } from 'src/usuario/entities/usuario.entity';
import { ChildEntity, Column, ManyToOne } from 'typeorm';
import { Organizacao } from './organizacao.entity';

@ChildEntity()
export class Funcionario extends Usuario {
  @Column()
  cpf: string;

  @Column()
  nome: string;

  @Column()
  endereco: string;

  @Column()
  dataNascimento: string;

  @ManyToOne(() => Organizacao, (organizacao) => organizacao.funcionarios, {
    eager: true,
  })
  organizacao: Organizacao;
}
