export interface Movimiento {
  id: number;
  fecha: number;
  monto: number;
  tipo: string;
}

export interface Cuenta {
  id: number;
  movimientos: Movimiento[];
  saldo: number;
}

export interface GetCuentaRequest {
  id: number;
}

export interface GetCuentaResponse {
  cuenta: Cuenta;
}

export interface GetSaldoRequest {
  id: number;
}

export interface GetSaldoResponse {
  saldo: number;
}

export interface GetMovimientosRequest {
  id: number;
}

export interface GetMovimientosResponse {
  movimientos: Movimiento[];
}

export interface TransferirRequest {
  cuentaOrigen: number;
  cuentaDestino: number;
  monto: number;
  bancoDestino?: string;
}

export interface TransferirResponse {
  message: string;
}
