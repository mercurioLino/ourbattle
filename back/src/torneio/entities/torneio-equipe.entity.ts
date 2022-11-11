import { Equipe } from "src/equipe/entities/equipe.entity";
import { ChildEntity, JoinTable, ManyToMany } from "typeorm";
import { Torneio } from "./torneio.entity";

@ChildEntity()
export class TorneioEquipe extends Torneio {  
    @ManyToMany(() => Equipe, {
        eager: true
    })
    @JoinTable({name: 'equipes_por_torneio'})  
    equipes: Equipe[]
}