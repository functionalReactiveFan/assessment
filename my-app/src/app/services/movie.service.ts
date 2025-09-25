import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private readonly filmsEndpoint = 'https://swapi.dev/api/films/';

  constructor(private http: HttpClient) { }

  getMovies(): Observable<Movie[]> {
    return this.http.get<{ count: number; next: string | null; previous: string | null; results: any[] }>(this.filmsEndpoint).pipe(
      map(response => response.results.map(film => this.mapFilmToMovie(film)))
    );
  }

  private mapFilmToMovie(film: any): Movie {
    return {
      imageUrl: `https://placehold.co/400x300/000000/FFFFFF?text=${encodeURIComponent(film.title)}`,
      imageAlt: film.title,
      title: film.title,
      director: film.director,
      producers: typeof film.producer === 'string' ? film.producer.split(',').map((p: string) => p.trim()) : [],
      releaseDate: film.release_date
    };
  }
}
