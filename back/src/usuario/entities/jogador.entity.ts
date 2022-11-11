import { Atendimento } from "src/atendimento/entities/atendimento.entity";
import { Equipe } from "src/equipe/entities/equipe.entity";
import { JogadorPerfilJogo } from "src/jogador-perfil-jogo/entities/jogador-perfil-jogo.entity";
import { Entity, Column, ManyToOne, OneToMany, ChildEntity } from "typeorm";
import { Usuario } from 'src/usuario/entities/usuario.entity';

@ChildEntity() 
export class Jogador extends Usuario{
    @Column()
    nome: string;

    @Column()
    nickname: string;

    @Column()
    pontuacao: number;

    @ManyToOne(() => Equipe, (equipe) => equipe.jogadores,{
        onDelete: "CASCADE" 
    })
    equipe?: Equipe;

    @OneToMany(() => JogadorPerfilJogo, (perfil) => perfil.jogador, {
        eager: true,
    })
    perfis?: JogadorPerfilJogo[];

    @OneToMany(() => Atendimento, (atendimento) => atendimento.jogador, {
        eager: true,
    })
    atendimentos?: Atendimento[];
}
