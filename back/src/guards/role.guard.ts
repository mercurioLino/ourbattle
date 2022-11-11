import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core';
import jwt_decode from 'jwt-decode'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { IS_PUBLIC_KEY } from 'src/shared/dto/decorator';
import { UsuarioService } from 'src/usuario/services/usuario.service';


@Injectable()
export class RolesGuard implements CanActivate {
  
  constructor(
    private reflector: Reflector,
    private usuarioService: UsuarioService
    ) {}


  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const roles  = this.reflector.get<string[]>('roles', context.getHandler());
    const total_roles = roles.filter(role => role === user.role);
    if(total_roles.length >=1){
      return true;
    }
    else{
      return false;
    }
  }

}

