import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsString, MaxLength } from "class-validator";
import { Equipe } from "src/equipe/entities/equipe.entity";
import { RelationEntityDto } from "src/shared/dto/relation-entity.dto";
import { CreateUsuarioDto } from "./create-usuario.dto";

export class CreateJogadorDto extends CreateUsuarioDto{
    @IsString()
    @MaxLength(16)
    @ApiProperty({example:'Ezreal AP é Bom'})
    nickname: string;

    @IsString()
    @ApiProperty({example:'Eduardo Alves de O. Freitas'})
    nome: string;

    @IsOptional()
    @Type(() => RelationEntityDto)
    @ApiProperty({example:'Objeto Equipe'})
    equipe: Equipe;

}
