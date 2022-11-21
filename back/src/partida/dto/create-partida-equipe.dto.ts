import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDateString, IsDefined, IsNotEmptyObject, IsNumber, IsObject, ValidateNested } from "class-validator";
import { CreateEquipeDto } from "src/equipe/dto/create-equipe.dto";
import { Equipe } from "src/equipe/entities/equipe.entity";
import { RelationEntityDto } from "src/shared/dto/relation-entity.dto";
import { Torneio } from "src/torneio/entities/torneio.entity";
import { CreatePartidaDto } from "./create-partida.dto";

export class CreatePartidaEquipeDto extends CreatePartidaDto{
}