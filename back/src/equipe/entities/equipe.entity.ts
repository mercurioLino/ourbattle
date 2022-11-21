import { IsOptional } from "class-validator";
import { Jogador } from "src/usuario/entities/jogador.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Equipe {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @IsOptional()
    pontuacao = 0;

    @OneToMany(() => Jogador, (jogador) => jogador.equipe, {
        eager: true,
    })
    jogadores?: Jogador[];
}

