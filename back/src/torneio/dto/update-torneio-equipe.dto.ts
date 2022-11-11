import { PartialType } from '@nestjs/mapped-types';
import { CreateTorneioEquipeDto } from './create-torneio-equipe.dto';

export class UpdateTorneioEquipeDto extends PartialType(CreateTorneioEquipeDto) {}
