import { Controller, Post, Body, Get, Param, Patch, Delete, ParseIntPipe, DefaultValuePipe, Query, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Role } from "src/enums/role.enum";
import { RolesGuard } from "src/guards/role.guard";
import { IsPublic } from "src/shared/dto/decorator";
import { Roles } from "src/shared/dto/decorator/roles.decorator";
import { CreatePartidaEquipeDto } from "./dto/create-partida-equipe.dto";
import { CreatePartidaIndividualDto } from "./dto/create-partida-individual.dto";
import { UpdatePartidaEquipeDto } from "./dto/update-partida-equipe.dto";
import { UpdatePartidaIndividualDto } from "./dto/update-partida-individual.dto";
import { UpdatePartidaDto } from "./dto/update-partida.dto";
import { PartidaEquipeService } from "./partida-equipe.service";
import { PartidaIndividualService } from "./partida-individual.service";
import { PartidaService } from "./partida.service";

@ApiTags('Partida')
@Controller('partida')
export class PartidaController {
  constructor(
    private readonly partidaIndividualService: PartidaIndividualService, 
    private readonly partidaEquipeService: PartidaEquipeService,
    private readonly partidaService: PartidaService) {}

  @Post('equipe')
  createPartidaEquipe(@Body() createPartidaDto: CreatePartidaEquipeDto) {
    return this.partidaEquipeService.create(createPartidaDto);
  }

  @Post('individual')
  createPartidaIndividual(@Body() createPartidaDto: CreatePartidaIndividualDto ) {
    return this.partidaIndividualService.create(createPartidaDto);
  }

  @Get()
  findAllPartidas(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('search') search: string,
  ) {
    return this.partidaService.findAll({ page, limit }, search);
  }

  @Get('individual')
  findAllPartidasIndividuais(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('search') search: string,
  ) {
    return this.partidaIndividualService.findAll({ page, limit }, search);
  }

  @Get('equipe')
  findAllPartidasEquipe(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('search') search: string,
  ) {
    return this.partidaEquipeService.findAll({ page, limit }, search);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.partidaService.findOne(id);
  }

  @Patch(':id')
  updatePartidaIndividual(@Param('id', ParseIntPipe) id: number, @Body() updatePartidaDto: UpdatePartidaIndividualDto | UpdatePartidaEquipeDto) {
    if(updatePartidaDto instanceof UpdatePartidaIndividualDto){
      return this.partidaIndividualService.update(id, updatePartidaDto);
    }
    return this.partidaEquipeService.update(id, updatePartidaDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.partidaService.remove(id);
  }
}
