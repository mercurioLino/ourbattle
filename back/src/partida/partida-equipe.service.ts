import { Equipe } from './../equipe/entities/equipe.entity';
import { RecordNotFoundException } from "@exceptions";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IPaginationOptions, Pagination, paginate } from "nestjs-typeorm-paginate";
import { FindOptionsWhere, ILike, Repository } from "typeorm";
import { CreatePartidaEquipeDto } from "./dto/create-partida-equipe.dto";
import { UpdatePartidaEquipeDto } from "./dto/update-partida-equipe.dto";
import { PartidaEquipe } from "./entities/partida-equipe.entity";
import { RelationEntityDto } from 'src/shared/dto/relation-entity.dto';

@Injectable()
export class PartidaEquipeService {
  constructor(@InjectRepository(PartidaEquipe) private repository: Repository<PartidaEquipe>,
  @InjectRepository(Equipe) private repositoryEquipe: Repository<Equipe>) {}

  create(createPartidaEquipeDto: CreatePartidaEquipeDto) {
    const partidaEquipe: PartidaEquipe = this.repository.create(createPartidaEquipeDto);
    return this.repository.save(partidaEquipe);
  }

  async findAll(options: IPaginationOptions, search?: string): Promise<Pagination<PartidaEquipe>> {
    const where: FindOptionsWhere<PartidaEquipe>={}; 

    /*if (search) {
      where.torneio = ILike(`%${search}%`);
    }*/
        
    return paginate<PartidaEquipe>(this.repository, options, {where});
  }

  async update(id: number, updatePartidaDto: UpdatePartidaEquipeDto): Promise<PartidaEquipe> {
    await this.repository.update(id, updatePartidaDto);
    const partida = await this.repository.findOneBy({id});

    if(!partida){
      throw new RecordNotFoundException();
    }

    return partida;
  }

  async declararVencedor(id: number, relationEntityDto: RelationEntityDto) {
    const partida = await this.repository.findOneBy({ id });
    if (!partida) {
      throw new RecordNotFoundException();
    }
    const equipe = await this.repositoryEquipe.findOneBy({
      id: relationEntityDto.id,
    });
    if (!equipe) {
      throw new RecordNotFoundException();
    }

    if(!partida.equipes.includes(equipe)){
      return "Equipe não está inscrito na partida para ser declarado como vencedor"
    }

    partida.vencedor = equipe;
    equipe.pontuacao += 1;
    this.repositoryEquipe.save(equipe);
    return this.repository.save(partida);
  }
}
