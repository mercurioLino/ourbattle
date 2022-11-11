import { RelationEntityDto } from './../../shared/dto/relation-entity.dto';
import { Type } from "class-transformer";
import { IsArray, IsDefined, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { CreatePartidaEquipeDto } from "src/partida/dto/create-partida-equipe.dto";
import { PartidaEquipe } from "src/partida/entities/partida-equipe.entity";
import { TorneioEquipe } from "src/torneio/entities/torneio-equipe.entity";
import { CreateJogadorDto } from 'src/usuario/dto/create-jogador.dto';
import { Jogador } from 'src/usuario/entities/jogador.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEquipeDto {
    @IsString()
    @ApiProperty({example:'Then dy nite COMPANY'})
    nome: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => RelationEntityDto)
    @ApiProperty({example:'Objeto do tipo Jogador'})
    jogadores: Jogador[]

    @ValidateNested()
    @Type(() => RelationEntityDto)
    @ApiProperty({example:'Objeto do tipo PartidaEquipe'})
    partidas: PartidaEquipe[];

    @ValidateNested()
    @Type(() => RelationEntityDto)
    @ApiProperty({example:'Objeto do tipo TorneioEquipe'})
    torneios: TorneioEquipe[];
}
