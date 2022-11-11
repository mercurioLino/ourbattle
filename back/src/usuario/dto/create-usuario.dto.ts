import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class CreateUsuarioDto {
    
    @IsEmail()
    @IsString()
    @ApiProperty({example:'alves.freitas@ufms.br'})
    email: string;

    
    @IsString()
    @ApiProperty({example: 'senha(sim, está sem RegEXP'})
    password: string;
}
