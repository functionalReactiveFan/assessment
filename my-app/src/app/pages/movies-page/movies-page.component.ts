import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Movie } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';

@Component({
  selector: 'app-movies-page',
  standalone: true,
  imports: [CommonModule, MovieListComponent],
  template: `
    <div class="container movies-page-container">
      <h1 class="page-title">Filme</h1>
      <app-movie-list [movies]="movies$ | async"></app-movie-list>
    </div>
  `,
  styles: [`
    .movies-page-container {
      padding-top: 64px;
      padding-bottom: 64px;
    }
    .page-title {
      font-size: 3.5rem;
      font-weight: 700;
      color: #0A1931;
      text-align: center;
      margin-top: 0;
      margin-bottom: 64px;
    }
    @media (max-width: 768px) {
      .page-title {
        font-size: 2.5rem;
        margin-bottom: 48px;
      }
      .movies-page-container {
        padding-top: 48px;
        padding-bottom: 48px;
      }
    }
  `]
})
export class MoviesPageComponent implements OnInit {
  movies$!: Observable<Movie[]>;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movies$ = this.movieService.getMovies();
  }
}