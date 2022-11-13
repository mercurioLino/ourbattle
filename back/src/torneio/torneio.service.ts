import { UpdateStatusTorneioDto } from './dto/update-status-torneio.dto';
import { RecordNotFoundException } from '@exceptions';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { Torneio } from './entities/torneio.entity';

@Injectable()
export class TorneioService {
  constructor(
    @InjectRepository(Torneio) private repository: Repository<Torneio>,
  ) {}

  async findAll(
    options: IPaginationOptions,
    search?: string,
  ): Promise<Pagination<Torneio>> {
    const where: FindOptionsWhere<Torneio> = {};

    if (search) {
      where.jogo = ILike(`%${search}%`);
    }

    return paginate<Torneio>(this.repository, options, { where });
  }

  async findOne(id: number) {
    const torneio = await this.repository.findOneBy({ id });

    if (!torneio) {
      throw new RecordNotFoundException();
    }

    return torneio;
  }

  async remove(id: number) {
    const torneio = await this.repository.findOneBy({ id });
    if (!torneio) {
      throw new RecordNotFoundException();
    }

    return this.repository.delete(id);
  }

  async alterarStatus(
    id: number,
    updateStatusTorneioDto: UpdateStatusTorneioDto,
  ) {
    const torneio = await this.repository.findOneBy({ id });
    if (!torneio) {
      throw new RecordNotFoundException();
    }

    torneio.status = updateStatusTorneioDto.status;
    return this.repository.save(torneio);
  }
}
