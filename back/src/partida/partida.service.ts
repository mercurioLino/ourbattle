import { RecordNotFoundException } from "@exceptions";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IPaginationOptions, Pagination, paginate } from "nestjs-typeorm-paginate";
import { FindOptionsWhere, ILike, Repository } from "typeorm";
import { Partida } from "./entities/partida.entity";

@Injectable()
export class PartidaService {
  constructor(@InjectRepository(Partida) private repository: Repository<Partida>) {}

  async findAll(options: IPaginationOptions, search?: string): Promise<Pagination<Partida>> {
    const where: FindOptionsWhere<Partida>={}; 

    if (search) {
      where.torneio = ILike(`%${search}%`);
    }
        
    return paginate<Partida>(this.repository, options, {where});
  }

  async findOne(id: number) {
    const partida = await this.repository.findOneBy({id});

    if(!partida){
      throw new RecordNotFoundException;
    }
        
    return partida;
  }

  async remove(id: number) {
    const partida = await this.repository.delete(id);
  
    if (!partida?.affected) {
      throw new RecordNotFoundException();
    }
  
    return 'Partida removido com sucesso!';
  }
}
