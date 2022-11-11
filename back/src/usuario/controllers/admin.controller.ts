import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { UsuarioService } from '../services/usuario.service';
import { RolesGuard } from 'src/guards/role.guard';
import { IsPublic } from 'src/shared/dto/decorator';
import { ApiTags } from '@nestjs/swagger';
import { AdminService } from '../services/admin.service';
import { CreateAdminDto } from '../dto/create-admin.dto';
import { Roles } from 'src/shared/dto/decorator/roles.decorator';
import { Role } from 'src/enums/role.enum';

@ApiTags('Admin')
@Controller('admin')
//@UseGuards(RolesGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService,
    private readonly usuarioService: UsuarioService) {}

  @Post()
  @Roles(Role.Admin)
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }
}