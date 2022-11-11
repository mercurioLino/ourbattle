import { Jogo } from "./jogo.model";
import { Organizacao } from "./organizacao.model";
import { Partida } from "./partida.model";

export interface Torneio {
  id: number;
  nome: string;
  data: string;
  hora: string;
  premiacao: number;
  regras: string;
  organizacao: Organizacao;
  jogo: Jogo;
  tipo: String;
  partidas: Partida[];
}
