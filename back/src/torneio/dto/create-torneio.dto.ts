import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString, IsDateString, IsNumber, IsPositive, ValidateNested, IsDefined, IsObject, IsNotEmpty } from "class-validator";
import { Jogo } from "src/jogo/entities/jogo.entity";
import { CreatePartidaDto } from "src/partida/dto/create-partida.dto";
import { Partida } from "src/partida/entities/partida.entity";
import { RelationEntityDto } from "src/shared/dto/relation-entity.dto";
import { Organizacao } from "src/usuario/entities/organizacao.entity";

export class CreateTorneioDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({example:'Eduardo Alves'})
    nome: string;

    @IsDateString()
    @ApiProperty({example:'2022-10-29'})
    data: string;

    @IsString()
    @ApiProperty({example:'13:13'})
    hora: string;

    @IsNumber()
    @IsPositive()
    @ApiProperty({example: 2500})
    premiacao: number;

    @IsString()
    @ApiProperty({example:'Somente Elos Iguais devem se enfrentar, proibído emprestar contas...'})
    regras: string;

    @IsDefined()
    @Type(() => RelationEntityDto)
    @ApiProperty({example:'Objeto do tipo Organização'})
    organizacao: Organizacao;

    @IsDefined()
    @Type(() => RelationEntityDto)  
    @ApiProperty({example:'Objeto do tipo Jogo'})
    jogo: Jogo;

    @ValidateNested()
    @Type(() => CreatePartidaDto)   
    @ApiProperty({example:'Objeto do tipo Partida'})
    partidas: Partida[]
}