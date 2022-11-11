import {  Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AtendimentoModule } from "./atendimento/atendimento.module";
import { Atendimento } from "./atendimento/entities/atendimento.entity";
import { AuthModule } from "./auth/auth.module";
import { JwtAuthGuard } from "./auth/guards/jwt-auth.guard";
import { Equipe } from "./equipe/entities/equipe.entity";
import { EquipeModule } from "./equipe/equipe.module";
import { Funcionario } from "./usuario/entities/funcionario.entity";
import { JogadorPerfilJogo } from "./jogador-perfil-jogo/entities/jogador-perfil-jogo.entity";
import { JogadorPerfilJogoModule } from "./jogador-perfil-jogo/jogador-perfil-jogo.module";
import { Jogo } from "./jogo/entities/jogo.entity";
import { JogoModule } from "./jogo/jogo.module";
import { PartidaEquipe } from "./partida/entities/partida-equipe.entity";
import { PartidaIndividual } from "./partida/entities/partida-individual.entity";
import { Partida } from "./partida/entities/partida.entity";
import { PartidaModule } from "./partida/partida.module";
import { TorneioEquipe } from "./torneio/entities/torneio-equipe.entity";
import { TorneioIndividual } from "./torneio/entities/torneio-individual.entity";
import { Torneio } from "./torneio/entities/torneio.entity";
import { TorneioModule } from "./torneio/torneio.module";
import { Usuario } from "./usuario/entities/usuario.entity";
import { UsuarioModule } from './usuario/usuario.module';
import { Jogador } from "./usuario/entities/jogador.entity";
import { Organizacao } from "./usuario/entities/organizacao.entity";
import { Admin } from "./usuario/entities/admin.entity";
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database/plataforma.db',
      entities: [
        Admin,
        Organizacao, 
        Jogador, 
        Funcionario, 
        Partida,
        PartidaEquipe, 
        PartidaIndividual, 
        Equipe, 
        Jogo, 
        JogadorPerfilJogo,
        Atendimento,
        TorneioIndividual,
        TorneioEquipe,
        Torneio,
        Usuario
      ],
      synchronize: true,
    }),
    EquipeModule,
    JogoModule,
    JogadorPerfilJogoModule,
    AtendimentoModule,
    AuthModule,
    TorneioModule,
    PartidaModule,
    UsuarioModule,
  ],
  controllers: [],
  providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }]
})
export class AppModule {}
