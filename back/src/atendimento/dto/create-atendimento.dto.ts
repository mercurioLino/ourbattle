import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString } from 'class-validator';
import { RelationEntityDto } from 'src/shared/dto/relation-entity.dto';
import { Jogador } from 'src/usuario/entities/jogador.entity';
import { Organizacao } from 'src/usuario/entities/organizacao.entity';

export class CreateAtendimentoDto {
  @IsString()
  @ApiProperty({
    example: 'Reportando o problema para a organização/funcionario',
  })
  descricao: string;

  @Type(() => RelationEntityDto)
  @ApiProperty({ example: 'Objeto do tipo Jogador' })
  jogador: Jogador;

  @Type(() => RelationEntityDto)
  @ApiProperty({ example: 'Objeto do tipo Organizacao' })
  organizacao: Organizacao;
}
