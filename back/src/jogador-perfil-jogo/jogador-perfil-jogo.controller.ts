import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, DefaultValuePipe, Query, UseGuards } from '@nestjs/common';
import { JogadorPerfilJogoService } from './jogador-perfil-jogo.service';
import { CreateJogadorPerfilJogoDto } from './dto/create-jogador-perfil-jogo.dto';
import { UpdateJogadorPerfilJogoDto } from './dto/update-jogador-perfil-jogo.dto';
import { ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/guards/role.guard';
import { Roles } from 'src/shared/dto/decorator/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { IsPublic } from 'src/shared/dto/decorator';

@ApiTags('Perfil')
@Controller('perfil')
@UseGuards(RolesGuard)
export class JogadorPerfilJogoController {
  constructor(private readonly jogadorPerfilJogoService: JogadorPerfilJogoService) {}

  @Post()
  @Roles(Role.Admin, Role.Jogador)
  create(@Body() createJogadorPerfilJogoDto: CreateJogadorPerfilJogoDto) {
    return this.jogadorPerfilJogoService.create(createJogadorPerfilJogoDto);
  }

  @Get()
  @IsPublic()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('search') search: string,
  ) {
    return this.jogadorPerfilJogoService.findAll({ page, limit }, search);
  }

  @Get(':id')
  @IsPublic()
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.jogadorPerfilJogoService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Admin, Role.Jogador)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateJogadorPerfilJogoDto: UpdateJogadorPerfilJogoDto) {
    return this.jogadorPerfilJogoService.update(id, updateJogadorPerfilJogoDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.jogadorPerfilJogoService.remove(id);
  }
}
