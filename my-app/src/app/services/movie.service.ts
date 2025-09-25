import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Movie } from '../models/movie.model';
import { fetchWithCache, LoadedRef } from './shared/fetch-cache';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private readonly filmsEndpoint = 'https://swapi.dev/api/films/';
  private readonly moviesSubject = new BehaviorSubject<Movie[]>([]);
  private moviesLoadedRef: LoadedRef = { value: false };

  constructor(private http: HttpClient) { }

  getMovies(forceRefresh: boolean = false): Observable<Movie[]> {
    return fetchWithCache<Movie>(
      this.http,
      this.filmsEndpoint,
      film => this.mapFilmToMovie(film),
      this.moviesSubject,
      this.moviesLoadedRef,
      forceRefresh
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
