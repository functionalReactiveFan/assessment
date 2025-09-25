import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MoviesPageComponent } from './pages/movies-page/movies-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HeaderComponent, MoviesPageComponent],
  template: `
    <app-header></app-header>
    <main>
      <app-movies-page></app-movies-page>
    </main>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    main {
      flex-grow: 1;
    }
  `]
})
export class AppComponent {
  title = 'star-wars-filme';
}
