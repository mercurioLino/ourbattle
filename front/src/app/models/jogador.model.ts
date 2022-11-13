import { User } from './user.model';
import { Suporte } from "./suporte.model";
import { Equipe } from "./equipe.model";
import { Perfil } from "./perfil.model";
import { Partida } from "./partida.model";
import { PartidaIndividual } from "./partidaIndividual.model";
import { TorneioEquipe } from "./torneioEquipe.model";

export interface Jogador extends User{
  nome: string;
  equipe: Equipe;
  perfis: Perfil[];
  suportes: Suporte[];
  partidas: Partida[];
  torneios: TorneioEquipe[];

}
