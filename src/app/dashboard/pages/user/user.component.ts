// users.component

import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

import { TitleComponent } from '@shared/title/title.component';
import { User } from '@interfaces/req-response';
import { switchMap } from 'rxjs';
import { UsersService } from '@services/users.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, TitleComponent],
  template: `
    <app-title [title]="titleLabel()" />
    @if(user()){
    <section>
      <img [alt]="user()!.first_name" [srcset]="user()!.avatar" />
      <div>
        <h3>{{ user()?.first_name }} {{ user()?.last_name }}</h3>
        <p>{{ user()?.email }}</p>
      </div>
    </section>
    }@else {
    <p>Cargando información...</p>
    }
  `,
})
export default class UserComponent {
  private route = inject(ActivatedRoute);
  private userService = inject(UsersService);

  // public user = signal<User | undefined>(undefined);
  public user = toSignal(
    this.route.params.pipe(
      switchMap(({ id }) => this.userService.getUserById(id))
    )
  );
  // obtiene el ID de usuario de los parámetros de la ruta, lo usa para recuperar la información del usuario del servicio, y convierte la secuencia observable resultante en una señal observable para manejarla de manera adecuada dentro del componente.

  //La razón por la que ves la información renderizada en tu HTML correctamente, es porque Angular maneja la actualización de la vista una vez que los datos se reciben y la señal property se actualiza correctamente.

  //señales y así mejorar la gestión del estado y el rendimiento de tu aplicación.

  public titleLabel = computed(() => {
    if (this.user()) {
      return `información del usuario: ${this.user()?.first_name} ${
        this.user()?.last_name
      }`;
    }
    console.log('Cargando información del usuario');

    return 'Información del usuario';
  });
}

// constructor() {
//   console.log(this.route.params.subscribe(params => {
//     console.log({ params });
//   }));
// }
