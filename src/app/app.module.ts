import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {FormsModule} from "@angular/forms";
import {NavBarComponent} from './components/nav-bar/nav-bar.component';
import {FooterBarComponent} from './components/footer-bar/footer-bar.component';
import {IndexComponent} from './components/administrador/empleado/index/index.component';
import {CreateComponent} from './components/administrador/empleado/create/create.component';
import {EmpleadoService} from './components/administrador/empleado/index/empleado.service';

import {RouterModule, Routes} from '@angular/router';
import {FiltrosPipe} from './components/administrador/empleado/filtros.pipe';
import {HttpClientModule} from '@angular/common/http';

const routes: Routes = [
  {path: '', redirectTo: '/empleados', pathMatch: 'full'},
  {path: 'empleados', component: IndexComponent},
  {path: 'empleados/create', component: CreateComponent},
  {path: 'empleados/create/:id', component: CreateComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterBarComponent,
    IndexComponent,
    CreateComponent,
    FiltrosPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [EmpleadoService],
  bootstrap: [AppComponent]
})
export class AppModule {
  title: string = 'Inventario de vacunación';
}
