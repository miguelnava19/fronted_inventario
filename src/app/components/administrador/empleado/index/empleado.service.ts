import {Injectable} from '@angular/core';
import {Empleado} from '../empleado';
import {EMPLEADOS} from './empleados.json';
import {of, Observable, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, catchError} from "rxjs/operators";
import swal from "sweetalert2";
import {Router} from "@angular/router";
import {AuthService} from "../../../usuarios/auth.service";

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private url: string = "http://localhost:8080/api/empleados"
  private headers = new HttpHeaders({'content-type': 'application/json'})

  private isNoAutorizado(e): boolean {
    if (e.status == 401) {
      if (this.authService.isAuthenticated()) {
        this.authService.logout();
      }
      this.router.navigate(['/login']);
      return true;
    }

    if (e.status == 403) {
      swal("Acceso denegado", `Hola ${this.authService.usuario.username} no tienes acceso a este recurso`, 'warning')
      this.router.navigate(['/empleados'])
      return true;
    }
    return false;
  }

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {
  }

  private addAuthorizationHeader() {
    let token = this.authService.token;
    if (token != null) {
      return this.headers.append('authorization', 'Bearer ' + token);
    }
    return this.headers;
  }

  getEmpleados(): Observable<Empleado[]> {
    // return of(EMPLEADOS);
    return this.http.get<Empleado[]>(this.url, {headers: this.addAuthorizationHeader()}).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );

  }

  create(empleado: Empleado): Observable<Empleado> {
    return this.http.post(this.url, empleado, {headers: this.addAuthorizationHeader()}).pipe(
      map((response: any) => response.empleado as Empleado),
      catchError(e => {
        console.error("create error", e);
        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }
        if (e.status === 400) {
          return throwError(e);
        }
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    )
  }

  getEmpleado(id): Observable<Empleado> {
    return this.http.get<Empleado>(`${this.url}/${id}`, {headers: this.addAuthorizationHeader()}).pipe(
      catchError(e => {
        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }
        this.router.navigate(['/empleados'])
        console.error("getEmpleado error", e);
        swal('Error', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  update(empleado: Empleado): Observable<any> {
    return this.http.put<any>(`${this.url}/${empleado.id}`, empleado, {headers: this.addAuthorizationHeader()}).pipe(
      catchError(e => {
        console.error("update error", e);
        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }
        if (e.status === 400) {
          return throwError(e);
        }
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  delete(id): Observable<Empleado> {
    return this.http.delete<Empleado>(`${this.url}/${id}`, {headers: this.addAuthorizationHeader()}).pipe(
      catchError(e => {
        console.error("delete error", e);
        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      }))
  }
}
