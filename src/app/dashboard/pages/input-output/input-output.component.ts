import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  signal,
} from '@angular/core';
import { ProductCardComponent } from './ui/product-card/product-card.component';

import { Product } from '@interfaces/product.interface';
import { interval, take, tap } from 'rxjs';

@Component({
  selector: 'app-input-output',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './input-output.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class InputOutputComponent implements OnDestroy {
  public products = signal<Product[]>([
    {
      id: 1,
      name: 'Producto 1',
      quantity: 0,
    },
    {
      id: 2,
      name: 'Producto 2',
      quantity: 0,
    },
  ]);

  private intervalSubscription = interval(1000)
    .pipe(
      tap(() => {
        this.products.update((products) => [
          ...products,
          {
            id: products.length + 1,
            name: `Producto ${products.length + 1}`,
            quantity: 0,
          },
        ]);
      }),
      take(7),
    )
    .subscribe();

  ngOnDestroy(): void {
    this.intervalSubscription.unsubscribe();
  }

  public updateProduct(product: Product, quantity: number) {
    // Actualiza la lista de productos
    this.products.update((products) =>
      // Itera sobre la lista de productos
      products.map((p) =>
        // Si el id del producto coincide con el id del producto que se desea actualizar
        p.id === product.id
          ? // Retorna una nueva versión del producto con la cantidad actualizada
            { ...p, quantity }
          : // Si no coincide, retorna el producto sin cambios
            p,
      ),
    );
  }
}
