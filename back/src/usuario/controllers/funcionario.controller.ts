import { Controller, Get, Post, Body, Patch, ParseIntPipe, Param, Delete, UseGuards, DefaultValuePipe, Query } from '@nestjs/common';
import { CreateFuncionarioDto } from '../dto/create-funcionario.dto';
import { UpdateFuncionarioDto } from '../dto/update-funcionario.dto';
import { FuncionarioService } from '../services/funcionario.service';
import { UsuarioService } from '../services/usuario.service';
import { RolesGuard } from 'src/guards/role.guard';
import { Role } from 'src/enums/role.enum';
import { Roles } from 'src/shared/dto/decorator/roles.decorator';
import { IsPublic } from 'src/shared/dto/decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Funcionario')
@Controller('funcionario')
@UseGuards(RolesGuard)
export class FuncionarioController {
  constructor(private readonly funcionarioService: FuncionarioService,
    private readonly usuarioService: UsuarioService) {}

  @Post()
  @IsPublic()
  create(@Body() createFuncionarioDto: CreateFuncionarioDto) {
    return this.funcionarioService.create(createFuncionarioDto);
  }
 
  @Get()
  @Roles(Role.Admin, Role.Organizacao)
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('search') search: string,
  ) {
    return this.funcionarioService.findAll({ page, limit }, search);
  }

  @Get(':id')
  @Roles(Role.Admin, Role.Organizacao)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.funcionarioService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateFuncionarioDto: UpdateFuncionarioDto) {
    return this.funcionarioService.update(id, updateFuncionarioDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.funcionarioService.remove(id);
  }
}
