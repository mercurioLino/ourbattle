import { RecordNotFoundException } from '@exceptions';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { CreateAtendimentoDto } from './dto/create-atendimento.dto';
import { UpdateAtendimentoDto } from './dto/update-atendimento.dto';
import { Atendimento } from './entities/atendimento.entity';

@Injectable()
export class AtendimentoService {
  constructor(@InjectRepository(Atendimento) private repository: Repository<Atendimento>) {}

  create(createAtendimentoDto: CreateAtendimentoDto) : Promise<Atendimento> {
    const atendimento: Atendimento = this.repository.create(createAtendimentoDto);
    atendimento.feedback = "Aguardando conclusão";
    atendimento.status = "Em aberto";
    return this.repository.save(atendimento);
  }

  async findAll(options: IPaginationOptions, search?: string): Promise<Pagination<Atendimento>> {
    const where: FindOptionsWhere<Atendimento>={}; 

    if (search) {
      where.status = ILike(`%${search}%`);
    }
        
    return paginate<Atendimento>(this.repository, options, {where});
  }

  async findOne(id: number) : Promise<Atendimento> {
    const atendimento = await this.repository.findOneBy({id});

    if(!atendimento){
      throw new RecordNotFoundException;
    }
        
    return atendimento;
  }

  async update(id: number, updateAtendimentoDto: UpdateAtendimentoDto) : Promise<Atendimento>{
    await this.repository.update(id, updateAtendimentoDto);
    const atendimento = await this.repository.findOneBy({id});
    if(!atendimento){
      throw new RecordNotFoundException();
    }
    return atendimento;
  }

  async remove(id: number) {
    const atendimento = await this.repository.delete(id);
  
    if (!atendimento?.affected) {
      throw new RecordNotFoundException();
    }
  
    return 'Atendimento de organização para jogador removido com sucesso'
  }
}
