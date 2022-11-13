import { Perfil } from "./perfil.model";
import { Torneio } from "./torneio.model";

export interface Jogo {
  id: number;
  nome: string;
  categoria: string;
  regras: string;
  torneios: Torneio[];
  perfis: Perfil[];
}
