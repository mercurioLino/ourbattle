import { User } from './user.model';
export interface Organizacao extends User{
  cnpj: string;
  razaoSocial: string;
  nomeFantasia: string;
}
