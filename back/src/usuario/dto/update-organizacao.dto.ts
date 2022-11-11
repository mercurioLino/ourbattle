import { PartialType, OmitType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';
import { CreateOrganizacaoDto } from './create-organizacao.dto';

export class UpdateOrganizacaoDto extends PartialType(CreateOrganizacaoDto) {}
