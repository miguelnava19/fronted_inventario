import {Component, OnInit} from '@angular/core';
import {Usuario} from "./usuario";
import swal from 'sweetalert2';
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {map, catchError} from "rxjs/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  titulo: string = 'Iniciar Sesión';
  usuario: Usuario;

  constructor(private authService: AuthService, private router: Router) {
    this.usuario = new Usuario();
  }


  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      if (this.authService.hasRole('ROLE_ADMIN'))
        this.router.navigate(['/empleados']);
      else
        this.router.navigate(['/empleados/create', this.authService.usuario.empleado.id ]);
    }
  }

  login(): void {
    console.log(this.usuario);
    if (this.usuario.username == null || this.usuario.password == null) {
      swal("Error login", "Username o contraseña vacías", "error")
      return;
    }

    this.authService.login(this.usuario).subscribe(
      response => {
        console.info("response login --> ", response);

        this.authService.guardarUsuario(response.access_token);
        this.authService.guardarToken(response.access_token);

        let usuario = this.authService.usuario;
        if (this.authService.hasRole('ROLE_ADMIN'))
          this.router.navigate(['/empleados']);
        else
          this.router.navigate(['/empleados/create', this.authService.usuario.empleado.id ]);
        swal(`Bienvenido ${usuario.username}`, `Hola ${usuario.username} bienvenido`, "success");

      }, e => {
        if (e.status == 400) {
          swal('Error login', 'Usuario o contraseña son incorrectos', 'error');
        }
      }
    )
  }


}
