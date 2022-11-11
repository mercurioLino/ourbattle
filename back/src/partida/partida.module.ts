import { EquipeModule } from 'src/equipe/equipe.module';
import { TorneioModule } from 'src/torneio/torneio.module';
import { forwardRef, Module } from '@nestjs/common';
import { PartidaController } from './partida.controller';
import { PartidaEquipeService } from './partida-equipe.service';
import { PartidaIndividualService } from './partida-individual.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Partida } from './entities/partida.entity';
import { PartidaEquipe } from './entities/partida-equipe.entity';
import { PartidaIndividual } from './entities/partida-individual.entity';
import { PartidaService } from './partida.service';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { UsuarioService } from 'src/usuario/services/usuario.service';

@Module({
  imports: [TypeOrmModule.forFeature([Partida, PartidaEquipe, PartidaIndividual]), 
  forwardRef(() => TorneioModule), 
  forwardRef(() => UsuarioModule), 
  forwardRef(() => EquipeModule)],
  controllers: [PartidaController],
  providers: [PartidaEquipeService, PartidaIndividualService, PartidaService, UsuarioService],
  exports: [TypeOrmModule]
})
export class PartidaModule {}
