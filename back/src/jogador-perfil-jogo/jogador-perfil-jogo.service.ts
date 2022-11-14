import { RecordNotFoundException } from '@exceptions';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions, paginate, Pagination
} from 'nestjs-typeorm-paginate';
import { FindManyOptions, ILike, Repository } from 'typeorm';
import { CreateJogadorPerfilJogoDto } from './dto/create-jogador-perfil-jogo.dto';
import { UpdateJogadorPerfilJogoDto } from './dto/update-jogador-perfil-jogo.dto';
import { JogadorPerfilJogo } from './entities/jogador-perfil-jogo.entity';

@Injectable()
export class JogadorPerfilJogoService {
  constructor(
    @InjectRepository(JogadorPerfilJogo)
    private repository: Repository<JogadorPerfilJogo>,
  ) {}

  create(createJogadorPerfilJogoDto: CreateJogadorPerfilJogoDto) {
    const perfil: JogadorPerfilJogo = this.repository.create(
      createJogadorPerfilJogoDto,
    );
    return this.repository.save(perfil);
  }

  async findAll(
    options: IPaginationOptions,
    search?: string,
  ): Promise<Pagination<JogadorPerfilJogo>> {
    const where: FindManyOptions<JogadorPerfilJogo> = {};
    if (search) {
      where.where = [
        { nickname: ILike(`%${search}%`) },
        { jogo: ILike(`%${search}%`) },
      ];
    }

    return paginate<JogadorPerfilJogo>(this.repository, options, where);
  }

  async findOne(id: number) {
    const perfil = await this.repository.findOneBy({ id });

    if (!perfil) {
      throw new RecordNotFoundException();
    }

    return perfil;
  }

  async update(
    id: number,
    updateJogadorPerfilJogoDto: UpdateJogadorPerfilJogoDto,
  ): Promise<JogadorPerfilJogo> {
    await this.repository.update(id, updateJogadorPerfilJogoDto);
    const perfil = await this.repository.findOneBy({ id });
    if (!perfil) {
      throw new RecordNotFoundException();
    }
    return perfil;
  }

  async remove(id: number) {
    const perfil = await this.repository.findOneBy({ id });

    if (!perfil) {
      throw new RecordNotFoundException();
    }

    return this.repository.delete(id);
  }
}
