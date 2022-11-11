
import { PartialType } from '@nestjs/mapped-types';
import { CreateTorneioIndividualDto } from './create-torneio-individual.dto';

export class UpdateTorneioIndividualDto extends PartialType(CreateTorneioIndividualDto) {}
