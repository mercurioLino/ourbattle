import { Module, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './estrategies/jwt.strategy';
import { LocalStrategy } from './estrategies/local.strategy';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { OrganizacaoService } from 'src/usuario/services/organizacao.service';
import { UsuarioService } from 'src/usuario/services/usuario.service';
import { JogadorService } from 'src/usuario/services/jogador.service';
import { TorneioModule } from 'src/torneio/torneio.module';
import { PartidaModule } from 'src/partida/partida.module';
import { JogoModule } from 'src/jogo/jogo.module';
import { JogadorPerfilJogoModule } from 'src/jogador-perfil-jogo/jogador-perfil-jogo.module';
import { EquipeModule } from 'src/equipe/equipe.module';
import { AtendimentoModule } from 'src/atendimento/atendimento.module';

@Module({
  imports: [
    forwardRef(()=>UsuarioModule),
    forwardRef(()=>TorneioModule),
    forwardRef(()=>PartidaModule),
    forwardRef(()=>JogoModule),
    forwardRef(()=>JogadorPerfilJogoModule),
    forwardRef(()=>EquipeModule),
    forwardRef(()=>AtendimentoModule),
  JwtModule.registerAsync({ useFactory: (configService: ConfigService) => {
    return {
      secret: configService.get<string>('JWT_SECRET'),
      signOptions: { expiresIn: '24h' },
    };
  },
  inject: [ConfigService],
})],
  controllers: [AuthController],
  providers: [AuthService, UsuarioService, OrganizacaoService, JogadorService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
