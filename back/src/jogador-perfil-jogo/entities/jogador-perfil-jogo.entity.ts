
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

    @ManyToOne(() => Jogo, {
        eager:true
    })
    jogo: Jogo;

    @ManyToOne(() => Jogador, {
        eager: true
    })
    jogador: Jogador;
}
