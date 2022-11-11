import { IsOptional } from "class-validator";
import { PartidaEquipe } from "src/partida/entities/partida-equipe.entity";
import { Jogador } from "src/usuario/entities/jogador.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Equipe {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @IsOptional()
    pontuacao = 0;

    @OneToMany(() => Jogador, (jogador) => jogador.equipe, {
        cascade: true,
        eager: true,
        onDelete: "CASCADE"
    })
    jogadores?: Jogador[];
}

