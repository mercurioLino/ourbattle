import { PartialType } from '@nestjs/mapped-types';
import { CreatePartidaIndividualDto } from './create-partida-individual.dto';

export class UpdatePartidaIndividualDto extends PartialType(CreatePartidaIndividualDto) {}
