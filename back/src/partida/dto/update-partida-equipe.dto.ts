import { PartialType } from '@nestjs/mapped-types';
import { CreatePartidaEquipeDto } from './create-partida-equipe.dto';

export class UpdatePartidaEquipeDto extends PartialType(CreatePartidaEquipeDto) {}
