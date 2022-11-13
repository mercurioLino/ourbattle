import { IsBoolean, IsOptional } from "class-validator";
import { Torneio } from "src/torneio/entities/torneio.entity";
import { Funcionario } from "src/usuario/entities/funcionario.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { ChildEntity, Column, OneToMany } from "typeorm";

@ChildEntity()
export class Organizacao extends Usuario{

    @Column({length: 14})
    cnpj: string;

    @Column()
    razaoSocial: string;

    @IsOptional()
    nomeFantasia: string;

    @IsBoolean()
    ativa: boolean;

    @OneToMany(() => Torneio, (torneio) => torneio.organizacao, {
        cascade: true,
    })
    torneios: Torneio[];

    @OneToMany(() => Funcionario, (funcionario) => funcionario.organizacao, {
        cascade: true,
    })
    funcionarios: Funcionario[];

}
