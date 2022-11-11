import { Jogador } from "./jogador.model";
import { Organizacao } from "./organizacao.model";
import { Torneio } from "./torneio.model";

export interface TorneioIndividual extends Torneio {
    jogadores: Jogador[];
}
