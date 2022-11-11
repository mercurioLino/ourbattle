import { TorneioModule } from './../torneio/torneio.module';
import { forwardRef, Module } from '@nestjs/common';
import { EquipeService } from './equipe.service';
import { EquipeController } from './equipe.controller';
import { Equipe } from './entities/equipe.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartidaModule } from 'src/partida/partida.module';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { UsuarioService } from 'src/usuario/services/usuario.service';

@Module({
  imports: [TypeOrmModule.forFeature([Equipe]), 
  forwardRef(() => TorneioModule), 
  forwardRef(() => UsuarioModule), 
  forwardRef(() => PartidaModule),
],
  controllers: [EquipeController],
  providers: [EquipeService, UsuarioService],
  exports: [TypeOrmModule]
})
export class EquipeModule {}
