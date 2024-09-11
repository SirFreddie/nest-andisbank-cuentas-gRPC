import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
// import { CreateTransferenciaDto } from './dto/create-transferencia.dto';
import { CUENTAS_ANDISBANK } from 'src/data/cuentas.mock';
import { CUENTAS_BANCOS_EXTERNOS } from 'src/data/cuentas-otros';
import {
  Cuenta,
  GetCuentaResponse,
  GetMovimientosResponse,
  GetSaldoResponse,
  TransferirRequest,
  TransferirResponse,
} from 'src/interfaces/cuentas.interface';

@Injectable()
export class CuentasService {
  cuentas: Cuenta[] = CUENTAS_ANDISBANK;
  cuentasExternas: any = CUENTAS_BANCOS_EXTERNOS;

  findOne(id: number): GetCuentaResponse {
    const cuenta = this.cuentas.find((cuenta) => cuenta.id === id);
    if (!cuenta) {
      throw new NotFoundException('Cuenta no encontrada');
    }
    return { cuenta };
  }

  findSaldo(id: number): GetSaldoResponse {
    const saldo = this.cuentas.find((cuenta) => cuenta.id === id).saldo;

    if (!saldo) {
      throw new NotFoundException('Saldo no encontrado');
    }

    return { saldo };
  }

  findMovimientos(id: number): GetMovimientosResponse {
    const movimientos = this.cuentas.find(
      (cuenta) => cuenta.id === id,
    ).movimientos;

    if (!movimientos) {
      throw new NotFoundException('Movimientos no encontrados');
    }

    return { movimientos };
  }

  transferir(data: TransferirRequest): TransferirResponse {
    const { cuentaOrigen, cuentaDestino, monto, bancoDestino } = data;

    const cuentaOrigenObj = this.findOne(cuentaOrigen).cuenta;

    if (!cuentaOrigenObj) {
      throw new NotFoundException('Cuenta origen no encontrada');
    }

    let cuentaDestinoObj;

    if (bancoDestino) {
      cuentaDestinoObj = this.cuentasExternas[bancoDestino].find(
        (cuenta) => cuenta.id === cuentaDestino,
      );

      if (!cuentaDestinoObj) {
        throw new NotFoundException('Cuenta destino no encontrada');
      }
    } else {
      cuentaDestinoObj = this.cuentas.find(
        (cuenta) => cuenta.id === cuentaDestino,
      );
    }

    if (cuentaOrigenObj.saldo < monto) {
      throw new ForbiddenException('Saldo insuficiente');
    }

    cuentaOrigenObj.saldo -= monto;

    cuentaDestinoObj.saldo += monto;

    const movimientoOrigen = {
      id: cuentaOrigenObj.movimientos.length + 1,
      fecha: new Date().getTime(),
      monto,
      tipo: 'Transferencia',
    };

    const movimientoDestino = {
      id: cuentaDestinoObj.movimientos.length + 1,
      fecha: new Date().getTime(),
      monto,
      tipo: 'Transferencia',
    };

    cuentaOrigenObj.movimientos.push(movimientoOrigen);
    cuentaDestinoObj.movimientos.push(movimientoDestino);

    return { message: 'Transferencia realizada' };
  }
}
