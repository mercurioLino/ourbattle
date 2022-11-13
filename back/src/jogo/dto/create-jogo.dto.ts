import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsDefined, IsString, ValidateNested } from "class-validator";
import { JogadorPerfilJogo } from "src/jogador-perfil-jogo/entities/jogador-perfil-jogo.entity";
import { RelationEntityDto } from "src/shared/dto/relation-entity.dto";
import { TorneioIndividual } from "src/torneio/entities/torneio-individual.entity";
import { Torneio } from "src/torneio/entities/torneio.entity";

export class CreateJogoDto {
    @IsString()
    @ApiProperty({example:'League Of Legends'})
    nome: string;
    
    @IsString()
    @ApiProperty({example:'Bronze'})
    categoria: string;

    @IsString()
    @ApiProperty({example:'Proíbido emprestar contas, smurfs, xingar o amiguinho'})
    regras: string;

    @ValidateNested()
    @Type(() => RelationEntityDto)
    @ApiProperty({example:'Objeto do tipo JogadorPerfilJogo'})
    perfis: JogadorPerfilJogo[]
}
