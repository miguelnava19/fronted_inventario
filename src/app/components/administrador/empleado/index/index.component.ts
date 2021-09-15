import {Component, OnInit} from '@angular/core';
import {Empleado} from '../empleado';
import {EmpleadoService} from './empleado.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html'
})
export class IndexComponent implements OnInit {
  empleadosList: Empleado[];
  title: string = 'Lista empleados';
  filtros: any = {
    dosis: '',
    estadoVacunacion: '',
    tipoVacuna: ''
  }

  constructor(private empleadoService: EmpleadoService) {
  }

  ngOnInit(): void {
    this.empleadoService.getEmpleados().subscribe(
      empleados => this.empleadosList = empleados
    );
  }

  limpiar() {
    this.filtros.dosis = ''
    this.filtros.estadoVacunacion = '';
    this.filtros.tipoVacuna= '';
  }

}
