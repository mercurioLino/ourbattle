import { PartialType } from '@nestjs/mapped-types';
import { CreateJogadorPerfilJogoDto } from './create-jogador-perfil-jogo.dto';

export class UpdateJogadorPerfilJogoDto extends PartialType(CreateJogadorPerfilJogoDto) {}
