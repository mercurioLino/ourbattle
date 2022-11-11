import { User } from './user.model';
import { Organizacao } from "./organizacao.model";

export interface Funcionario extends User{
  nome: string;
  endereco: string;
  dataNascimento: string;
  organizacao: Organizacao;
}