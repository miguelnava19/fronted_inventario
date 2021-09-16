import {Injectable} from '@angular/core';
import {Empleado} from '../empleado';
import {EMPLEADOS} from './empleados.json';
import {of, Observable, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, catchError} from "rxjs/operators";
import swal from "sweetalert2";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private url: string = "http://localhost:8080/api/empleados"
  private headeres = new HttpHeaders({'content-type': 'application/json'})

  constructor(private http: HttpClient, private router: Router) {

  }

  getEmpleados(): Observable<Empleado[]> {
    // return of(EMPLEADOS);
    return this.http.get<Empleado[]>(this.url);

  }

  create(empleado: Empleado): Observable<any> {
    return this.http.post(this.url, empleado, {headers: this.headeres}).pipe(
      map((response: any) => response.entidad as Empleado),
      catchError(e => {
        console.error("create error", e);
        if (e.status === 400) {
          return throwError(e);
        }
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    )
  }

  getEmpleado(id): Observable<Empleado> {
    return this.http.get(`${this.url}/${id}`).pipe(
      map((response: any) => response.entidad as Empleado),
      catchError(e => {
        this.router.navigate(['/empleados'])
        console.error("getEmpleado error", e);
        swal('Error', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  update(empleado: Empleado): Observable<any> {
    return this.http.put<any>(`${this.url}/${empleado.id}`, empleado, {headers: this.headeres}).pipe(
      catchError(e => {
        console.error("update error", e);
        if (e.status === 400) {
          return throwError(e);
        }
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  delete(id): Observable<Empleado> {
    return this.http.delete<Empleado>(`${this.url}/${id}`, {headers: this.headeres}).pipe(
      catchError(e => {
        console.error("delete error", e);
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      }))
  }
}
