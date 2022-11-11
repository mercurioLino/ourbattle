import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDateString, ValidateNested, IsObject, IsDefined, IsNotEmptyObject, IsString } from "class-validator";
import { RelationEntityDto } from "src/shared/dto/relation-entity.dto";
import { Torneio } from "src/torneio/entities/torneio.entity";
import { JoinColumn } from "typeorm";

export class CreatePartidaDto {
    @IsDateString()
    @ApiProperty({example:'2022-11-28'})
    data: string;

    @IsString()
    @ApiProperty({example:'13:13'})
    hora: string;

    @Type(() => RelationEntityDto)
    @ApiProperty({example:'Objeto do tipo Torneio'})
    torneio: Torneio;   
}