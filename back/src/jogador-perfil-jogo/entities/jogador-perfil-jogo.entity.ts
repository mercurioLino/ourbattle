
import { Jogo } from "src/jogo/entities/jogo.entity";
import { Jogador } from "src/usuario/entities/jogador.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class JogadorPerfilJogo {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    nickname: string;

    @Column()
    elo: string;

    @ManyToOne(() => Jogo, (jogo) => jogo.perfis)
    jogo: Jogo;

    @ManyToOne(() => Jogador, (jogador) => jogador.perfis, {
        onDelete: "CASCADE"
    })
    jogador: Jogador;
}
