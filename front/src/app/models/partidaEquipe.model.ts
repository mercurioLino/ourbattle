import { Equipe } from "./equipe.model";
import { Partida } from "./partida.model";

export interface PartidaEquipe extends Partida {
  equipe: Equipe[];
}
