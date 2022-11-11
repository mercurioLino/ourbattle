import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { CreateUsuarioDto } from "./create-usuario.dto";
export class CreateOrganizacaoDto extends CreateUsuarioDto{
    @IsNumberString()
    @MinLength(14)
    @MaxLength(14)
    @ApiProperty({example:'01301313131313'})
    cnpj: string;

    @IsString()
    @ApiProperty({example:'Luiz Inácio da Silva LTDA'})
    razaoSocial: string;

    @IsString()
    @IsOptional()
    @ApiProperty({example:'Lula 2022 LTDA'})
    nomeFantasia: string;
}
