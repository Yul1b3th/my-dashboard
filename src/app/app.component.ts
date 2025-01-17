import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements AfterViewInit {
  ngAfterViewInit() {
    const appRoot = document.querySelector('app-root');

    if (appRoot) {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (
            mutation.type === 'attributes' &&
            appRoot.getAttribute('aria-hidden') === 'true'
          ) {
            appRoot.removeAttribute('aria-hidden');
          }
        });
      });

      observer.observe(appRoot, { attributes: true });
    }
  }
}
