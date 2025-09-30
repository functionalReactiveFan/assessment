import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Movie } from '../../models/movie.model';
import { ApisService } from '../../services/apis.service';
import { CardComponent } from '../../components/card/card.component';
import { extractId, FILMS_ID_REGEX } from '../../utils/swapi-url';

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
    return id ? `/films-detail/${id}` : '/films-detail/1';
  }
}
