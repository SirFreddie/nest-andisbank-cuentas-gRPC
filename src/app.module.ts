import { Module } from '@nestjs/common';
import { CuentasService } from './cuentas/cuentas.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { CuentasController } from './cuentas/cuentas.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CUENTAS_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'cuentas',
          protoPath: join(__dirname, '../protos/cuentas.proto'),
        },
      },
    ]),
  ],
  providers: [CuentasService],
  controllers: [CuentasController],
})
export class AppModule {}
