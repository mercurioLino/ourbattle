import { Type } from "class-transformer";
import { IsString, IsNumber, Max, Min, ValidateNested, IsObject, IsDefined, IsEmpty, IsOptional } from "class-validator";
import { Funcionario } from "src/usuario/entities/funcionario.entity";
import { RelationEntityDto } from "src/shared/dto/relation-entity.dto";
import { Jogador } from "src/usuario/entities/jogador.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateAtendimentoDto {
    @IsString()
    @ApiProperty({example:'Reportando o problema para a organização/funcionario'})
    descricao: string;

    @Type(() => RelationEntityDto)
    @ApiProperty({example:'Objeto do tipo Jogador'})
    jogador: Jogador;

    @IsOptional()
    @Type(() => RelationEntityDto)
    @ApiProperty({example:'Objeto do tipo Funcionario'})
    funcionario: Funcionario;
}
