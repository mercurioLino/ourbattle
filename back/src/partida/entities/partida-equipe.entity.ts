import { Equipe } from "src/equipe/entities/equipe.entity";
import { ChildEntity,   JoinTable, ManyToMany } from "typeorm";
import { Partida } from "./partida.entity";

@ChildEntity()
export class PartidaEquipe extends Partida{
    @ManyToMany(() => Equipe, {
        cascade: true,
        eager: true,
        onDelete: 'CASCADE'
    })
    @JoinTable({name: 'equipes_por_partida'})
    equipes: Equipe[]
}
