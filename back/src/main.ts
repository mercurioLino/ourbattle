import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationError } from 'class-validator';

import { AppModule } from './app.module';


//AUTORES: EDUARDO ALVES DE OLIVEIRA FREITAS E LEONARDO GABRIEL MERCURIO LINO

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(validationErrors);
      },
    }),
  );
      const config = new DocumentBuilder()
      .setTitle('Doc. Swagger - OurBattle.gg')
      .setDescription(
        `Swagger De OurBattle.gg - Desenvolvido Por Eduardo Alves e Leonardo Gabriel, em caso de Dúvidas Para <a href="mailto:alves.freitas@ufms.br?subject=AJUDA &cc=leonardo.gabriel@ufms.br&body=Preciso de ajuda com REST API SWAGGER">Contato`,
      )
      .setVersion('1.0')
      .addTag('Jogador')
      .addTag('Organização')
      .addTag('Funcionario')
      .addTag('Torneio')
      .addTag('Partida')
      .addTag('Jogo')
      .addTag('Jogador-Pefil-Jogo')
      .addTag('Equipe')
      .addTag('Auth')
      .addTag('Atendimento')
      .build();

      const document = SwaggerModule.createDocument(app, config);
      SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();