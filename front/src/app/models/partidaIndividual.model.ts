import { Jogador } from "./jogador.model";
import { Partida } from "./partida.model";
import { TorneioIndividual } from "./torneioIndividual.model";

export interface  PartidaIndividual extends Partida {
  jogadores: Jogador[];
}
