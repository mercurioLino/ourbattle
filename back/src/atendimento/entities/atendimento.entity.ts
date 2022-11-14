import { Funcionario } from "src/usuario/entities/funcionario.entity";
import { Jogador } from "src/usuario/entities/jogador.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity()
export class Atendimento {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    descricao: string;

    @Column()
    status: string;

    @Column()
    feedback: string;

    @ManyToOne(() => Jogador, {
        eager: true
    })
    jogador: Jogador;

    @ManyToOne(() => Funcionario, {
        eager: true
    })
    funcionario: Funcionario;
}
