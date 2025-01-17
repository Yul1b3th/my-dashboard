import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '@shared/title/title.component';
import { log } from 'console';

@Component({
  selector: 'app-change-detection',
  standalone: true,
  imports: [CommonModule, TitleComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-title [title]="currentFramework()" />
    <pre>{{ frameworkAsSignal() | json }}</pre>
    <pre> {{ frameworkAsProperty | json }} </pre>
  `,
  styles: ``
})
export default class ChangeDetectionComponent {

  // Señal computada, de solo lectura
  public currentFramework = computed(
    () => `Change detection - ${this.frameworkAsSignal().name}`
  )

  public frameworkAsSignal = signal({
    name: 'Angular',
    releaseDate: 2016,
  })
  public frameworkAsProperty = {
    name: 'Angular',
    releaseDate: 2016,
  }

  constructor() {
    setTimeout(() => {

      // this.frameworkAsProperty.name = 'React';

      this.frameworkAsSignal.update(value => {
        value.name = 'React';
        return { ...value };
      })

      console.log('hecho');

    }, 3000);
  }


}
