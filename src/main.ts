import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as config from 'config';
import * as dotenv from 'dotenv';
import { writeFile } from 'fs';
import * as path from 'path';
import { ApplicationModule } from './app.module';
import { AuthGuard } from './common/auth/guards/auth.guard';
import { AllExceptionsFilter } from './common/filters/all-exception.filter';
import { WinstonLogger } from './common/services/logger.service';
process.env.NODE_CONFIG_DIR = path.join(__dirname, '../config');


dotenv.config({ path: '../.env' });

declare const module: any;

const SWAGGER_SCHEMA_PATH = path.resolve('public/swagger.json');

async function bootstrap() {
  const logger = new WinstonLogger('Main');
  logger.log('PG DB config, will connect to ' + config.db.pg.host + ':' + config.db.pg.port + '/' + config.db.pg.database);

  const app = await NestFactory.create(ApplicationModule, {
    cors: true,
    logger,
  });

  app.useStaticAssets(path.join(__dirname, '..', 'public'));
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalGuards(new AuthGuard(new Reflector()));

  const options = new DocumentBuilder()
    .setVersion('0.0.1')
    .setTitle('API Documentation')
    .setHost(`${config.api.host}:${config.api.port}`)
    .setBasePath(config.api.prefix)
    // .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  writeFile(SWAGGER_SCHEMA_PATH, JSON.stringify(document, null, 2), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('\n- swagger schema was created -\n');
    }
  });


  // app.setGlobalPrefix(config.api.prefix);
  await app.listen(config.api.port);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
