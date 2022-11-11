import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { Usuario } from '../entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { RecordNotFoundException } from '@exceptions';

@Injectable()
export class UsuarioService {
constructor(@InjectRepository(Usuario) private repository: Repository<Usuario>) {}
  async findOne(id: number) {
    const usuario = await this.repository.findOneBy({id});

    if(!usuario){
      throw new RecordNotFoundException;
    }

    return usuario;
  }

  async findByEmail(email: string, includePassowrd = false): Promise<Usuario> {
    const usuario = await this.repository
      .createQueryBuilder('usuario')
      .addSelect('usuario.password')
      .where('usuario.email = :email', { email })
      .getOne();

    if (includePassowrd) {
      return usuario;
    } else {
      const { password, ...result } = usuario;
      return result as Usuario;
    }
  }  
}
