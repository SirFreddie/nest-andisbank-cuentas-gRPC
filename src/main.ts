import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'cuentas',
        protoPath: join(__dirname, '../protos/cuentas.proto'),
      },
    },
  );

  await app.listen();
  console.log('gRPC server is running');
}
bootstrap();
