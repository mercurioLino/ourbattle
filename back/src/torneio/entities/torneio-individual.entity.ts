import { Jogador } from 'src/usuario/entities/jogador.entity';
import { ChildEntity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { Torneio } from './torneio.entity';

@ChildEntity()
export class TorneioIndividual extends Torneio {
  @ManyToMany(() => Jogador, {
    eager: true,
  })
  @JoinTable({ name: 'jogadores_por_torneio' })
  jogadores: Jogador[];

  @ManyToOne(() => Jogador, {
    eager: true,
  })
  vencedor: Jogador;
}
