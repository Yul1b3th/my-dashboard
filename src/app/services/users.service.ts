// users.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

import type { User, UserResponse, UsersResponse } from '@interfaces/req-response';
import { catchError, delay, map, of } from 'rxjs';


interface State {
  users: User[];
  loading: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  private http = inject(HttpClient);

  #state = signal<State>({
    loading: true,
    users: [],
  });

  // Señales computadas
  public users = computed(() => this.#state().users);
  public loading = computed(() => this.#state().loading);

constructor() {
    this.http.get<UsersResponse>('https://reqres.in/api/users')
      .pipe(
        delay(1500),
        catchError(error => {
          console.error('Error al cargar usuarios:', error);
          this.#state.set({
            loading: false,
            users: [],
          });
          return of({ data: [] } as unknown as UsersResponse); // Devuelve un observable con un objeto vacío, Esto permite manejar errores sin interrumpir el flujo de datos en la aplicación.
        })
      )
      .subscribe(res => {
        this.#state.set({
          loading: false,
          users: res.data,
        });
      });
    console.log('Cargando data');
}

  getUserById(id: string) {
    return this.http.get<UserResponse>(`https://reqres.in/api/users/${id}`)
      .pipe(
        delay(1500),
        map(resp => resp.data),
        catchError(error => {
          console.error(`Error al cargar el usuario con ID ${id}:`, error);
          return of(null); // Devuelve null en caso de error
        })
      )
  }

}
