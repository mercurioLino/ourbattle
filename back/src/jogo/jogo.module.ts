import { TorneioModule } from './../torneio/torneio.module';
import { forwardRef, Module } from '@nestjs/common';
import { JogoService } from './jogo.service';
import { JogoController } from './jogo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jogo } from './entities/jogo.entity';
import { JogadorPerfilJogoModule } from 'src/jogador-perfil-jogo/jogador-perfil-jogo.module';
import { UsuarioService } from 'src/usuario/services/usuario.service';
import { UsuarioModule } from 'src/usuario/usuario.module';

@Module({
  imports: [TypeOrmModule.forFeature([Jogo]), 
  forwardRef(() => TorneioModule), 
  forwardRef(() => UsuarioModule), 
  forwardRef(() => JogadorPerfilJogoModule)],
  controllers: [JogoController],
  providers: [JogoService, UsuarioService],
  exports: [TypeOrmModule]
})
export class JogoModule {}
