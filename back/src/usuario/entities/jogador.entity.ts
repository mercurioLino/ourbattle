import { TorneioIndividual } from 'src/torneio/entities/torneio-individual.entity';
import { Atendimento } from "src/atendimento/entities/atendimento.entity";
import { Equipe } from "src/equipe/entities/equipe.entity";
import { JogadorPerfilJogo } from "src/jogador-perfil-jogo/entities/jogador-perfil-jogo.entity";
import { PartidaIndividual } from 'src/partida/entities/partida-individual.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { ChildEntity, Column, ManyToOne, OneToMany } from "typeorm";

@ChildEntity() 
export class Jogador extends Usuario{
    @Column()
    nome: string;

    @Column()
    nickname: string;

    @Column()
    pontuacao: number;

    @ManyToOne(() => Equipe, (equipe) => equipe.jogadores)
    equipe?: Equipe;

    @OneToMany(() => JogadorPerfilJogo, (perfil) => perfil.jogador, {
        eager: true,
    })
    perfis?: JogadorPerfilJogo[];

    @OneToMany(() => Atendimento, (atendimento) => atendimento.jogador, {
        eager: true,
    })
    atendimentos?: Atendimento[];

    @OneToMany(() => PartidaIndividual, (partida) => partida.vencedor)
    vitoriasPartidasIndividuais?: PartidaIndividual[]
    /*
    @OneToMany(() => TorneioIndividual, (torneio) => torneio.vencedor)
    vitoriasTorneiosIndividuais?: TorneioIndividual[]*/
}   
