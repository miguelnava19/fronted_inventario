import { Component, OnInit } from '@angular/core';
import {AuthService} from "../usuarios/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './nav-bar.component.html',
})
export class NavBarComponent {
  title: string = 'Frontend';
  constructor(public authservice: AuthService) {
  }

  logout():void{
    this.authservice.logout();
  }

}
