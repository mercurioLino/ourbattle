import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, DefaultValuePipe, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Role } from 'src/enums/role.enum';
import { RolesGuard } from 'src/guards/role.guard';
import { Roles } from 'src/shared/dto/decorator/roles.decorator';
import { AtendimentoService } from './atendimento.service';
import { CreateAtendimentoDto } from './dto/create-atendimento.dto';
import { UpdateAtendimentoDto } from './dto/update-atendimento.dto';

@ApiTags('Atendimento')
@Controller('suporte')
@UseGuards(RolesGuard)
export class AtendimentoController {
  constructor(private readonly atendimentoService: AtendimentoService) {}

  @Post()
  @Roles(Role.Admin, Role.Funcionario)
  create(@Body() createAtendimentoDto: CreateAtendimentoDto) {
    return this.atendimentoService.create(createAtendimentoDto);
  }

  @Get()
  @Roles(Role.Admin, Role.Funcionario)
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('search') search: string,
  ) {
    return this.atendimentoService.findAll({ page, limit }, search);
  }

  @Get(':id')
  @Roles(Role.Admin, Role.Funcionario)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.atendimentoService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Admin, Role.Funcionario)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateAtendimentoDto: UpdateAtendimentoDto) {
    return this.atendimentoService.update(id, updateAtendimentoDto);
  }

  @Delete(':id')
  @Roles(Role.Admin, Role.Funcionario)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.atendimentoService.remove(id);
  }
}
