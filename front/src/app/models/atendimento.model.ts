import { Funcionario } from "./funcionario.model";
import { Jogador } from "./jogador.model";

export interface Atendimento {
  id: number;
  descricao: string;
  jogador: Jogador;
  funcionario: Funcionario;


}
