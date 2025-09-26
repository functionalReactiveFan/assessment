import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Movie } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';
import { CardComponent } from '../../components/card/card.component';
import { extractFilmId } from '../../utils/swapi-url';

@Component({
  selector: 'app-movies-page',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './movies-page.component.html',
  styleUrls: ['./movies-page.component.scss']
})
export class MoviesPageComponent implements OnInit {
  movies$!: Observable<Movie[]>;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movies$ = this.movieService.getMovies();
  }

  getMovieDetailHref(m: Movie): string {
    const id = extractFilmId(m.url);
    return id ? `/films-detail/${id}` : '/films-detail/1';
  }
}
