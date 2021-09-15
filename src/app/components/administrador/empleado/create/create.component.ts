import { Component, OnInit } from '@angular/core';
import {Empleado} from "../empleado";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html'
})
export class CreateComponent implements OnInit {
  empleado: Empleado;
  constructor() { }

  ngOnInit(): void {
    this.empleado.fechaNacimiento = '';
    this.empleado.domicilio = '';
    this.empleado.telefono = '';
    this.empleado.estadoVacunacion = '';
    this.empleado.tipoVacuna = '';
    this.empleado.numeroDosis = '';
  }

}
