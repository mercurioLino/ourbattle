import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreateAtendimentoDto } from './create-atendimento.dto';

export class UpdateAtendimentoDto extends PartialType(CreateAtendimentoDto) {
  @IsString()
  @ApiProperty({ example: 1234567890 })
  feedback: string;

  @IsString()
  @ApiProperty({ example: 'Em Aberto, Concluído' })
  status: 'Em Aberto' | 'Resolvendo' | 'Concluído';
}
