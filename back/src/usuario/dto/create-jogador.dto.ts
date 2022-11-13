import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsString, MaxLength, ValidateNested } from "class-validator";
import { Atendimento } from "src/atendimento/entities/atendimento.entity";
import { Equipe } from "src/equipe/entities/equipe.entity";
import { JogadorPerfilJogo } from "src/jogador-perfil-jogo/entities/jogador-perfil-jogo.entity";
import { PartidaIndividual } from "src/partida/entities/partida-individual.entity";
import { RelationEntityDto } from "src/shared/dto/relation-entity.dto";
import { TorneioIndividual } from "src/torneio/entities/torneio-individual.entity";
import { CreateUsuarioDto } from "./create-usuario.dto";

export class CreateJogadorDto extends CreateUsuarioDto{
    @IsString()
    @MaxLength(16)
    @ApiProperty({example:'Ezreal AP é Bom'})
    nickname: string;

    @IsString()
    @ApiProperty({example:'Eduardo Alves de O. Freitas'})
    nome: string;

    @IsOptional()
    @Type(() => RelationEntityDto)
    @ApiProperty({example:'Objeto Equipe'})
    equipe: Equipe;

    @IsOptional()
    @ValidateNested()
    @Type(() => RelationEntityDto)
    @ApiProperty({example:'Objetos do tipo JogadorPerfilJogo'})
    perfis: JogadorPerfilJogo[]

    @IsOptional()
    @ValidateNested()
    @Type(() => RelationEntityDto)
    @ApiProperty({example:'Objeto do tipo Atendimento'})
    atendimentos: Atendimento[]

    @ValidateNested()
    @Type(() => RelationEntityDto)
    @ApiProperty({example:'Obejto do tipo PartidaIndividual'})
    partidas: PartidaIndividual[];

    @ValidateNested()
    @Type(() => RelationEntityDto)
    @ApiProperty({example:'Objeto do tipo TorneioIndividual'})
    torneios: TorneioIndividual[];
}
