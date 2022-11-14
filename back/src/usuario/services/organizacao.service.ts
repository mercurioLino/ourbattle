import { RecordNotFoundException } from '@exceptions';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { RelationEntityDto } from 'src/shared/dto/relation-entity.dto';
import { Funcionario } from 'src/usuario/entities/funcionario.entity';
import { FindManyOptions, ILike, Repository } from 'typeorm';
import { CreateOrganizacaoDto } from '../dto/create-organizacao.dto';
import { UpdateOrganizacaoDto } from '../dto/update-organizacao.dto';
import { Organizacao } from '../entities/organizacao.entity';

@Injectable()
export class OrganizacaoService {
  constructor(
    @InjectRepository(Organizacao) private repository: Repository<Organizacao>,
    @InjectRepository(Funcionario)
    private repositoryFuncionario: Repository<Funcionario>,
  ) {}

  async create(
    createOrganizacaoDto: CreateOrganizacaoDto,
  ): Promise<Organizacao> {
    const organizacao: Organizacao =
      this.repository.create(createOrganizacaoDto);
    organizacao.status = 'Ativa';
    organizacao.role = 'organizacao';
    return this.repository.save(organizacao);
  }

  async findOne(id: number) {
    const usuario = await this.repository.findOneBy({ id });

    if (!usuario) {
      throw new RecordNotFoundException();
    }

    return usuario;
  }

  async findAll(
    options: IPaginationOptions,
    search?: string,
  ): Promise<Pagination<Organizacao>> {
    const where: FindManyOptions<Organizacao> = {};
    if (search) {
      where.where = [
        { razaoSocial: ILike(`%${search}%`) },
        { cnpj: ILike(`%${search}%`) },
      ];
    }

    return paginate<Organizacao>(this.repository, options, where);
  }

  async update(
    id: number,
    updateOrganizacaoDto: UpdateOrganizacaoDto,
  ): Promise<Organizacao> {
    await this.repository.update(id, updateOrganizacaoDto);
    const organizacao = await this.repository.findOneBy({ id });
    if (!organizacao) {
      throw new RecordNotFoundException();
    }

    return organizacao;
  }

  async remove(id: number) {
    const organizacao = await this.repository.findOneBy({ id });
    if (!organizacao) {
      throw new RecordNotFoundException();
    }

    return this.repository.delete(id);
  }

  async addFuncionario(
    id: number,
    addFuncionarioOrganizacaoDto: RelationEntityDto,
  ) {
    const organizacao = await this.repository.findOneBy({ id });
    if (!organizacao) {
      throw new RecordNotFoundException();
    }
    const funcionario = await this.repositoryFuncionario.findOneBy({
      id: addFuncionarioOrganizacaoDto.id,
    });
    if (!funcionario) {
      throw new RecordNotFoundException();
    }
    organizacao.funcionarios.push(funcionario);
    return this.repository.save(organizacao);
  }
}
