import { Jogador } from "./jogador.model";
import { Jogo } from "./jogo.model";

export interface JogadorPerfilJogo {
  id: number;
  nickname: string;
  elo: string;
  jogo: Jogo;
  jogador: Jogador;
}
