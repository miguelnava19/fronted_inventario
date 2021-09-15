import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterBarComponent } from './components/footer-bar/footer-bar.component';
import { IndexComponent } from './components/administrador/empleado/index/index.component';
import { CreateComponent } from './components/administrador/empleado/create/create.component';
import { EditComponent } from './components/administrador/empleado/edit/edit.component';
import { EmpleadoService } from './components/administrador/empleado/index/empleado.service';

import {RouterModule, Routes} from '@angular/router';
import { FormularioComponent } from './components/administrador/empleado/formulario/formulario.component';
import { FiltrosPipe } from './components/administrador/empleado/filtros.pipe';

const routes: Routes= [
  {path: '', redirectTo: '/empleados', pathMatch: 'full'},
  {path: 'empleados', component: IndexComponent},
  {path: 'empleados/create', component: CreateComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterBarComponent,
    IndexComponent,
    CreateComponent,
    EditComponent,
    FormularioComponent,
    FiltrosPipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [EmpleadoService],
  bootstrap: [AppComponent]
})
export class AppModule {
  title: string ='Inventario de vacunación';
 }
