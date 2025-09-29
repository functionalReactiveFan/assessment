import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, catchError, map, Observable, of, tap} from 'rxjs';

import { Movie } from '../models/movie.model';
import { Person } from '../models/person.model';
import { Planet } from '../models/planet.model';
import { fetchWithCache } from './shared/fetch-cache';

@Injectable({ providedIn: 'root' })
export class ApisService {
  private readonly filmsEndpoint = 'https://swapi.dev/api/films/';
  private readonly peopleEndpoint = 'https://swapi.dev/api/people/';
  private readonly planetsEndpoint = 'https://swapi.dev/api/planets/';

  private readonly moviesSubject = new BehaviorSubject<Movie[]>([]);
  private readonly peopleSubject = new BehaviorSubject<Person[]>([]);
  private readonly planetsSubject = new BehaviorSubject<Planet[]>([]);

  private moviesLoaded: boolean = false;
  private peopleLoaded: boolean = false;
  private planetsLoaded: boolean = false;

  constructor(private http: HttpClient) {}

  // Movies
  getMovies(): Observable<Movie[]> {
    const cachedMovies: Movie[] = this.moviesSubject.getValue();
    if (cachedMovies.length > 0) {
      return this.moviesSubject.asObservable();
    }
    return this.http
      .get<any>(this.filmsEndpoint)
      .pipe(
        map(({ results })=> results.map((item: any) => this.mapMovie(item))),
        tap((movies: Movie[]) => this.moviesSubject.next(movies)),
        catchError(() => {
          this.moviesSubject.next([]);
          return of([]);
        }))
  }

  getMovieById(id: number | string): Observable<any> {
    const url = `${this.filmsEndpoint}${id}/`;
    return this.http.get<any>(url);
  }

  // People
  getPeople(forceRefresh: boolean = false): Observable<Person[]> {
    return fetchWithCache<Person>(
      this.http,
      this.peopleEndpoint,
      p => this.mapPerson(p),
      this.peopleSubject,
      forceRefresh
    );
  }

  getPersonById(id: number | string): Observable<any> {
    const url = `${this.peopleEndpoint}${id}/`;
    return this.http.get<any>(url);
  }

  // Planets
  getPlanets(forceRefresh: boolean = false): Observable<Planet[]> {
    return fetchWithCache<Planet>(
      this.http,
      this.planetsEndpoint,
      p => this.mapPlanet(p),
      this.planetsSubject,
      forceRefresh
    );
  }

  getPlanetById(id: number | string): Observable<any> {
    const url = `${this.planetsEndpoint}${id}/`;
    return this.http.get<any>(url);
  }

  // Starships
  getStarships(forceRefresh: boolean = false): Observable<any[]> {
    return fetchWithCache<any>(
      this.http,
      this.planetsEndpoint,
      p => this.mapPlanet(p),
      this.planetsSubject,
      forceRefresh
    );
  }


  // Mappers
  private mapMovie(film: any): Movie {
    return {
      imageUrl: `https://placehold.co/400x300/000000/FFFFFF?text=${encodeURIComponent(film.title)}`,
      imageAlt: film.title,
      title: film.title,
      director: film.director,
      producers: typeof film.producer === 'string' ? film.producer.split(',').map((p: string) => p.trim()) : [],
      releaseDate: film.release_date,
      url: film.url
    };
  }

  private mapPerson(p: any): Person {
    const displayName = typeof p.name === 'string' ? p.name : 'Unknown';
    return {
      name: displayName,
      gender: p.gender,
      birthYear: p.birth_year,
      heightCm: p.height,
      massKg: p.mass,
      imageUrl: `https://placehold.co/400x300/1a1a1a/ffffff?text=${encodeURIComponent(displayName)}`,
      imageAlt: displayName,
      url: p.url
    };
  }

  private mapPlanet(p: any): Planet {
    const displayName = typeof p.name === 'string' ? p.name : 'Unknown';
    return {
      name: displayName,
      climate: p.climate,
      terrain: p.terrain,
      population: p.population,
      diameterKm: p.diameter,
      gravity: p.gravity,
      films: p.films,
      imageUrl: `https://placehold.co/400x300/14213d/ffffff?text=${encodeURIComponent(displayName)}`,
      imageAlt: displayName,
      url: p.url
    };
  }
}
