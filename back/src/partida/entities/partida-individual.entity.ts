import { Jogador } from 'src/usuario/entities/jogador.entity';
import { ChildEntity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { Partida } from './partida.entity';

@ChildEntity()
export class PartidaIndividual extends Partida {
  @ManyToMany(() => Jogador, {
    eager: true,
  })
  @JoinTable({ name: 'jogadores_por_partida' })
  jogadores: Jogador[];

  @ManyToOne(() => Jogador, {
    eager: true,
  })
  vencedor: Jogador;
}
