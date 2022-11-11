import { Equipe } from "./equipe.model";
import { Organizacao } from "./organizacao.model";
import { Torneio } from "./torneio.model";

export interface TorneioEquipe extends Torneio{
    equipe: Equipe[];
}
