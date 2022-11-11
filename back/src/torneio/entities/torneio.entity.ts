import { IsOptional } from "class-validator";
import { Jogo } from "src/jogo/entities/jogo.entity";
import { Partida } from "src/partida/entities/partida.entity";
import { Organizacao } from "src/usuario/entities/organizacao.entity";
import { Entity, TableInheritance, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, JoinTable } from "typeorm";
import { ForeignKeyMetadata } from "typeorm/metadata/ForeignKeyMetadata";

@Entity()
@TableInheritance({column: {type: "varchar", name: "tipo"}})
export class Torneio{
    @PrimaryGeneratedColumn()
    id: number;

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

    @OneToMany(() => Partida, (partida) => partida.torneio, {
        cascade: true,
        eager: true,
        onDelete: "CASCADE"
    })
    partidas: Partida[];
    
    @ManyToOne(() => Organizacao, (organizacao) => organizacao.torneios)
    @JoinColumn()
    organizacao: Organizacao;

    @ManyToOne(() => Jogo, (jogo) => jogo.torneios)
    @JoinColumn()
    jogo: Jogo;
}