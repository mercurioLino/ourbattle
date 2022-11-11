import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, DefaultValuePipe, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateAtendimentoDto } from 'src/atendimento/dto/create-atendimento.dto';
import { Role } from 'src/enums/role.enum';
import { RolesGuard } from 'src/guards/role.guard';
import { IsPublic } from 'src/shared/dto/decorator';
import { Roles } from 'src/shared/dto/decorator/roles.decorator';
import { CreateJogadorDto } from '../dto/create-jogador.dto';
import { UpdateJogadorDto } from '../dto/update-jogador.dto';
import { JogadorService } from '../services/jogador.service';
import { UsuarioService } from '../services/usuario.service';

@ApiTags('Jogador')
@Controller('jogador')
@UseGuards(RolesGuard)
export class JogadorController {
  constructor(private readonly jogadorService: JogadorService,
    private readonly usuarioService: UsuarioService) {}

  @Post()
  @IsPublic()
  create(@Body() createJogadorDto: CreateJogadorDto) {
    return this.jogadorService.create(createJogadorDto);
  }

  @Get()
  @IsPublic()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('search') search: string,
  ) {
    return this.jogadorService.findAll({ page, limit }, search);
  }

  @Get(':id')
  @Roles(Role.Admin, Role.Funcionario, Role.Organizacao)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.jogadorService.findOne(id);
  }

  @Post(':id/solicitar-atendimento')
  @Roles(Role.Admin, Role.Jogador)
  solicitarAtendimento(@Param('id', ParseIntPipe) id: number, @Body() createAtendimentoDto : CreateAtendimentoDto) {
    return this.jogadorService.solicitarAtendimento(id, createAtendimentoDto);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateJogadorDto: UpdateJogadorDto) {
    return this.jogadorService.update(id, updateJogadorDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.jogadorService.remove(id);
  }
}
