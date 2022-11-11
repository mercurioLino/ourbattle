import { IsOptional } from "class-validator";
import { Atendimento } from "src/atendimento/entities/atendimento.entity";
import { ChildEntity, Column, Entity, JoinTable, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario} from "src/usuario/entities/usuario.entity";
import { Organizacao } from "./organizacao.entity";

@ChildEntity()
export class Funcionario extends Usuario{    
    @Column()   
    cpf: string;

    @Column()
    nome: string;

    @Column()
    endereco: string;

    @Column()
    dataNascimento: string    

    @ManyToOne(() => Organizacao, (organizacao) => organizacao.torneios)
    organizacao: Organizacao;

    @OneToMany(() => Atendimento, (atendimento) => atendimento.funcionario, {
        cascade: true,
        eager: true,
    })
    atendimentos: Atendimento[];
    
}
