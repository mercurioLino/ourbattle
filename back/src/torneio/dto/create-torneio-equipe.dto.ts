import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { Equipe } from "src/equipe/entities/equipe.entity";
import { RelationEntityDto } from "src/shared/dto/relation-entity.dto";
import { CreateTorneioDto } from "./create-torneio.dto";

export class CreateTorneioEquipeDto extends CreateTorneioDto{
    @ValidateNested()
    @Type(() => RelationEntityDto)
    @ApiProperty({example:'Objeto do tipo Equipe'})
    equipes: Equipe[];
}