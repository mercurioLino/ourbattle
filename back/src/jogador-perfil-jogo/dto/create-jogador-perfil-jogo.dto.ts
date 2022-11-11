import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDefined, IsObject, IsString, ValidateNested } from "class-validator";
import { Jogo } from "src/jogo/entities/jogo.entity";
import { RelationEntityDto } from "src/shared/dto/relation-entity.dto";
import { Jogador } from "src/usuario/entities/jogador.entity";

export class CreateJogadorPerfilJogoDto {
    @IsString()
    @ApiProperty({example:'Ezral AP é Bom'})
    nickname: string;

    @IsString()
    @ApiProperty({example:'Prata'})
    elo: string;

    @ValidateNested()
    @Type(() => RelationEntityDto)
    @IsObject()
    @IsDefined()
    @ApiProperty({example:'Objeto do tipo Jogo'})
    jogo: Jogo;

    @ValidateNested()
    @Type(() => RelationEntityDto)
    @IsObject()
    @IsDefined()
    @ApiProperty({example:'Objeto do tipo Jogador'})
    jogador: Jogador;
}
