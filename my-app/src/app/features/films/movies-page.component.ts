import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../../models/movie.model';
import { ApisService } from '../../services/apis.service';
import { extractId, FILMS_ID_REGEX } from '../../utils/helpers';

@Component({
  selector: 'app-movies-page',
  templateUrl: './movies-page.component.html',
  styleUrls: ['./movies-page.component.scss']
})
export class MoviesPageComponent implements OnInit {
  movies$!: Observable<Movie[]>;

  constructor(private apis: ApisService) {}

  ngOnInit(): void {
    this.movies$ = this.apis.getMovies();
  }

  getMovieDetailHref(m: Movie): string {
    const id = extractId(m.url, FILMS_ID_REGEX);
    return id ? `/films/${id}` : '/films/1';
  }
}
