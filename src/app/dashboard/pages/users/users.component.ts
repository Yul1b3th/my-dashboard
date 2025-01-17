// user.component

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { UsersService } from '@services/users.service';
import { TitleComponent } from '@shared/title/title.component';


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    TitleComponent,
    RouterModule
  ],
  templateUrl: './users.component.html',
  styles: ``
})

export default class UsersComponent {
  // El servicio se ha inyectado
  public userService = inject(UsersService)

  //Se debe utilizar el servicio

}
