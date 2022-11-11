
import { Jogador } from "src/usuario/entities/jogador.entity";
import { ChildEntity, JoinTable, ManyToMany } from "typeorm";
import { Partida } from "./partida.entity";

@ChildEntity()
export class PartidaIndividual extends Partida{
    @ManyToMany(() => Jogador, {
        cascade: true,
        eager: true,
        onDelete: 'CASCADE'
    })
    @JoinTable({name: 'jogadores_por_partida'})
    jogadores: Jogador[]
}
