import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ValidateNested, IsObject, IsDefined } from "class-validator";
import { RelationEntityDto } from "src/shared/dto/relation-entity.dto";
import { Jogador } from "src/usuario/entities/jogador.entity";
import { CreateTorneioDto } from "./create-torneio.dto";

export class CreateTorneioIndividualDto extends CreateTorneioDto{
    @ValidateNested()
    @Type(() => RelationEntityDto)
    @ApiProperty({example:'Objeto do tipo Jogador'})
    jogadores: Jogador[];
}
