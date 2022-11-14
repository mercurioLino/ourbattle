import { Funcionario } from 'src/usuario/entities/funcionario.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { ChildEntity, Column, OneToMany } from 'typeorm';

@ChildEntity()
export class Organizacao extends Usuario {
  @Column({ length: 14 })
  cnpj: string;

  @Column()
  razaoSocial: string;

  @Column()
  nomeFantasia: string;

  @Column()
  status: 'Ativa' | 'Inativa';

  @OneToMany(() => Funcionario, (funcionario) => funcionario.organizacao, {
    cascade: true,
  })
  funcionarios: Funcionario[];
}
