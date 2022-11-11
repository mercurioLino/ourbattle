import { hashSync } from "bcrypt";
import { IsBoolean, IsOptional } from "class-validator";
import { Funcionario } from "src/usuario/entities/funcionario.entity";
import { TorneioIndividual } from "src/torneio/entities/torneio-individual.entity";
import { Torneio } from "src/torneio/entities/torneio.entity";
import { BeforeInsert, ChildEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "src/usuario/entities/usuario.entity";

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
        eager: true,
    })
    torneios: Torneio[];

    @OneToMany(() => Funcionario, (funcionario) => funcionario.organizacao, {
        cascade: true,
        eager: true,
    })
    funcionarios: Funcionario[];

}
