import { Component, OnInit } from '@angular/core';
import {Empleado} from "../empleado";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {
  empleado: Empleado;
  constructor() { }

  ngOnInit(): void {
  }

}
