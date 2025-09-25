import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from '../../models/movie.model';
import { MovieCardComponent } from '../movie-card/movie-card.component';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, MovieCardComponent],
  template: `
    <div class="movie-grid">
      <app-movie-card *ngFor="let movie of movies" [movie]="movie"></app-movie-card>
    </div>
  `,
  styles: [`
    .movie-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 32px;
    }

    @media (max-width: 992px) {
      .movie-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 576px) {
      .movie-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class MovieListComponent {
  @Input() movies: Movie[] | null = [];
}