import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDateString, IsString, MaxLength, MinLength } from "class-validator";
import { RelationEntityDto } from "src/shared/dto/relation-entity.dto";
import { Organizacao } from "../entities/organizacao.entity";
import { CreateUsuarioDto } from "./create-usuario.dto";

export class CreateFuncionarioDto extends CreateUsuarioDto{

    @IsString()
    @MaxLength(14)
    @MinLength(11)
    @ApiProperty({example: '123.456.789.09 OU 12345678909'})
    cpf: string;

    @IsString()
    @ApiProperty({example: 'Eduardo Alves de Oliveira Freitas'})
    nome: string;

    @IsString()
    @ApiProperty({example: 'Rua Neves de Barros, 2109'})
    endereco: string;

    @IsDateString()
    @ApiProperty({example: '1999-03-12'})
    dataNascimento: string
    
    @Type(() => RelationEntityDto)
    @ApiProperty({example:'Objeto Organização'})
    organizacao: Organizacao;
}
