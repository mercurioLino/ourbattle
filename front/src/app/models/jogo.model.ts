import { JogadorPerfilJogo } from "./jogadorPerfilJogo.model";
import { Torneio } from "./torneio.model";

export interface Jogo {
  nome: string;
  categoria: string;
  regras: string;
  torneios: Torneio[];
  perfis: JogadorPerfilJogo[];
}
