import { Injectable } from '@angular/core';
import { Empleado } from '../empleado';
import { EMPLEADOS } from './empleados.json';
import { of, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor() { }

  getEmpleados(): Observable<Empleado[]> {
    return of(EMPLEADOS);
  }
}
