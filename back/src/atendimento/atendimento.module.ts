import { forwardRef, Module } from '@nestjs/common';
import { AtendimentoService } from './atendimento.service';
import { AtendimentoController } from './atendimento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Atendimento } from './entities/atendimento.entity';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { UsuarioService } from 'src/usuario/services/usuario.service';

@Module({
  imports: [TypeOrmModule.forFeature([Atendimento]),  
  forwardRef(() => UsuarioModule)],
  controllers: [AtendimentoController],
  providers: [AtendimentoService, UsuarioService],
  exports: [TypeOrmModule]
})
export class AtendimentoModule {}
