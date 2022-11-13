import { PartidaEquipe } from 'src/partida/entities/partida-equipe.entity';
import { Equipe } from 'src/equipe/entities/equipe.entity';
import { RecordNotFoundException } from '@exceptions';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { CreateTorneioEquipeDto } from './dto/create-torneio-equipe.dto';
import { UpdateTorneioEquipeDto } from './dto/update-torneio-equipe.dto';
import { TorneioEquipe } from './entities/torneio-equipe.entity';
import { CreatePartidaEquipeDto } from 'src/partida/dto/create-partida-equipe.dto';
import { RelationEntityDto } from 'src/shared/dto/relation-entity.dto';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class TorneioEquipeService {
  
  constructor(
    @InjectRepository(TorneioEquipe) private repository: Repository<TorneioEquipe>,
    @InjectRepository(Equipe) private repositoryEquipe: Repository<Equipe>,
    @InjectRepository(PartidaEquipe) private repositoryPartidaEquipe: Repository<PartidaEquipe>
  ) {}

  create(createTorneioEquipeDto: CreateTorneioEquipeDto) {
    const torneioEquipe: TorneioEquipe = this.repository.create(createTorneioEquipeDto);
    return this.repository.save(torneioEquipe);
  }

  async findAll(options: IPaginationOptions, search?: string): Promise<Pagination<TorneioEquipe>> {
    const where: FindOptionsWhere<TorneioEquipe>={}; 

    if (search) {
      where.jogo = ILike(`%${search}%`);
    }
        
    return paginate<TorneioEquipe>(this.repository, options, {where});
  }

  async findOne(id: number) {
    const torneio = await this.repository.findOneBy({id});

    if(!torneio){
      throw new RecordNotFoundException;
    }
        
    return torneio;
  }

  async update(id: number, updateTorneioDto: UpdateTorneioEquipeDto ): Promise<TorneioEquipe> {
    await this.repository.update(id, updateTorneioDto);
    const torneio = await this.repository.findOneBy({id});

    if(!torneio){
      throw new RecordNotFoundException();
    }

    return torneio;
  }

  async addEquipe(id: number, relationEntityDto: RelationEntityDto){
    const torneio: TorneioEquipe = await this.repository.findOneBy({id});
    if(!torneio){
      throw new RecordNotFoundException();
    }
    const equipe = await this.repositoryEquipe.findOneBy({id: relationEntityDto.id})
    if(!equipe){
      throw new RecordNotFoundException();
    }
    torneio.equipes.push(equipe);
    return this.repository.save(torneio);
  }

  async gerarPartida(id: number, createPartidaDto: CreatePartidaEquipeDto){
    const torneio = await this.findOne(id);
    torneio.partidas = []

    const jogadoresInscritos = torneio.equipes;
    const equipesAuxiliar: Equipe[] = [];
    if(jogadoresInscritos.length < 16){
      return 'Não há equipes suficientes inscritas para gerar as partidas'
    } 
 
    for(let i = 0; i < 16; i++){
      equipesAuxiliar[i] = jogadoresInscritos[i];
    }
    
    for(let i = 0; i < 8; i++){
      const partida = this.repositoryPartidaEquipe.create(createPartidaDto);
      partida.equipes = [];
      for(let j = 0; j < 2; j++){
        const indexJogador=Math.floor(Math.random() * jogadoresInscritos.length)
        partida.equipes.push(jogadoresInscritos[indexJogador]);
        jogadoresInscritos.splice(indexJogador, 1);
      }
      torneio.partidas.push(partida)
    }

    torneio.equipes = equipesAuxiliar;
    return this.repository.save(torneio);
  }

  async declararVencedor(id: number, relationEntityDto: RelationEntityDto) {
    const torneio = await this.repository.findOneBy({ id });
    if (!torneio) {
      throw new RecordNotFoundException();
    }
    const equipe = await this.repositoryEquipe.findOneBy({
      id: relationEntityDto.id,
    });
    if (!equipe) {
      throw new RecordNotFoundException();
    }

    if (!torneio.equipes.map((v) => v.id).includes(equipe.id)) {
      return 'Jogador não está inscrito no torneio para ser declarado como vencedor';
    }

    torneio.vencedor = equipe;
    equipe.pontuacao += 1;
    this.repositoryEquipe.save(equipe);
    return this.repository.save(torneio);
  }
}
