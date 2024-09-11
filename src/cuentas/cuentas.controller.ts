import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CuentasService } from './cuentas.service';
import {
  GetCuentaRequest,
  GetCuentaResponse,
  GetMovimientosRequest,
  GetMovimientosResponse,
  GetSaldoRequest,
  GetSaldoResponse,
  TransferirRequest,
  TransferirResponse,
} from '../interfaces/cuentas.interface';

@Controller()
export class CuentasController {
  constructor(private readonly cuentasService: CuentasService) {}

  @GrpcMethod('CuentasService', 'GetCuenta')
  async getAccount(data: GetCuentaRequest): Promise<GetCuentaResponse> {
    const { id } = data;
    return this.cuentasService.findOne(id);
  }

  @GrpcMethod('CuentasService', 'GetSaldo')
  async getSaldo(data: GetSaldoRequest): Promise<GetSaldoResponse> {
    const { id } = data;
    return this.cuentasService.findSaldo(id);
  }

  @GrpcMethod('CuentasService', 'GetMovimientos')
  async getMovimientos(
    data: GetMovimientosRequest,
  ): Promise<GetMovimientosResponse> {
    const { id } = data;
    return this.cuentasService.findMovimientos(id);
  }

  @GrpcMethod('CuentasService', 'Transferir')
  async transferir(data: TransferirRequest): Promise<TransferirResponse> {
    return this.cuentasService.transferir(data);
  }
}
