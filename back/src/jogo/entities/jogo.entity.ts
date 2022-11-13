import { IsEmpty, IsOptional } from "class-validator";
import { JogadorPerfilJogo } from "src/jogador-perfil-jogo/entities/jogador-perfil-jogo.entity";
import { TorneioIndividual } from "src/torneio/entities/torneio-individual.entity";
import { Torneio } from "src/torneio/entities/torneio.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Jogo{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nome: string;

    @Column()
    categoria: string;

    @Column()
    regras: string;
    
    @OneToMany(() => JogadorPerfilJogo, (perfil) => perfil.jogo, {
        cascade: true,
        eager: true,
    })  
    @JoinColumn()  
    perfis: JogadorPerfilJogo[];
}