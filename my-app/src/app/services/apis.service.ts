import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { Movie } from '../models/movie.model';
import { Person } from '../models/person.model';
import { Planet } from '../models/planet.model';
import { Starship } from "../models/starship.model";
import { Vehicle } from "../models/vehicle.model";

@Injectable({ providedIn: 'root' })
export class ApisService {
  private readonly filmsEndpoint = 'https://swapi.dev/api/films/';
  private readonly peopleEndpoint = 'https://swapi.dev/api/people/';
  private readonly planetsEndpoint = 'https://swapi.dev/api/planets/';
  private readonly starshipsEndpoint = 'https://swapi.dev/api/starships/';
  private readonly vehiclesEndpoint = 'https://swapi.dev/api/vehicles/';

  private readonly moviesSubject = new BehaviorSubject<Movie[]>([]);
  private readonly peopleSubject = new BehaviorSubject<Person[]>([]);
  private readonly planetsSubject = new BehaviorSubject<Planet[]>([]);
  private readonly starshipsSubject = new BehaviorSubject<Starship[]>([]);
  private readonly vehiclesSubject = new BehaviorSubject<Vehicle[]>([]);

  private readonly imagesPlaceholder = 'https://placehold.co/400x300/000000/FFFFFF?text='

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

  getMovieById(id: string): Observable<Movie> {
    const url = `${this.filmsEndpoint}${id}/`;
    const cachedMovies: Movie[] = this.moviesSubject.getValue();
    if (cachedMovies.length > 0) {
      const movie = cachedMovies.find((movie: Movie) => movie.url === url);
      if (movie) {
        return of(movie);
      }
    }
    return this.http.get<any>(url).pipe(map((film: any) => this.mapMovie(film)));
  }

  // People
  getPeople(): Observable<Person[]> {
    const cachedPeople: Person[] = this.peopleSubject.getValue();
    if (cachedPeople.length > 0) {
      return this.peopleSubject.asObservable();
    }
    return this.http
      .get<any>(this.peopleEndpoint)
      .pipe(
        map(({ results })=> results.map((item: any) => this.mapPerson(item))),
        tap((people: Person[]) => this.peopleSubject.next(people)),
        catchError(() => {
          this.peopleSubject.next([]);
          return of([]);
        }))
  }

  getPersonById(id: string): Observable<Person> {
    const url = `${this.peopleEndpoint}${id}/`;
    const cachedPeople: Person[] = this.peopleSubject.getValue();
    if (cachedPeople.length > 0) {
      const person = cachedPeople.find((person: Person) => person.url === url);
      if (person) {
        return of(person);
      }
    }
    return this.http.get<any>(url).pipe(map((p: any) => this.mapPerson(p)));
  }

  // Planets
  getPlanets(): Observable<Planet[]> {
    const cachedPlanets: Planet[] = this.planetsSubject.getValue();
    if (cachedPlanets.length > 0) {
      return this.planetsSubject.asObservable();
    }
    return this.http
      .get<any>(this.planetsEndpoint)
      .pipe(
        map(({ results })=> results.map((item: any) => this.mapPlanet(item))),
        tap((planets: Planet[]) => this.planetsSubject.next(planets)),
        catchError(() => {
          this.planetsSubject.next([]);
          return of([]);
        }))
  }

  getPlanetById(id: string): Observable<Planet> {
    const url = `${this.planetsEndpoint}${id}/`;
    const cachedPlanets: Planet[] = this.planetsSubject.getValue();
    if (cachedPlanets.length > 0) {
      const planet = cachedPlanets.find((planet: Planet) => planet.url === url);
      if (planet) {
        return of(planet);
      }
    }
    return this.http.get<any>(url).pipe(map((p: any) => this.mapPlanet(p)));
  }

  // Starships
  getStarships(): Observable<Starship[]> {
    const cachedStarships: Starship[] = this.starshipsSubject.getValue();
    if (cachedStarships.length > 0) {
      return this.starshipsSubject.asObservable();
    }
    return this.http
      .get<any>(this.starshipsEndpoint)
      .pipe(
        map(({ results })=> results.map((item: any) => this.mapStarship(item))),
        tap((starships: Starship[]) => this.starshipsSubject.next(starships)),
        catchError(() => {
          this.starshipsSubject.next([]);
          return of([]);
        }))
  }

  // Vehicles
  getVehicles(): Observable<Vehicle[]> {
    const cachedVehicles: Vehicle[] = this.vehiclesSubject.getValue();
    if (cachedVehicles.length > 0) {
      return this.vehiclesSubject.asObservable();
    }
    return this.http
      .get<any>(this.vehiclesEndpoint)
      .pipe(
        map(({ results })=> results.map((item: any) => this.mapVehicle(item))),
        tap((vehicles: Vehicle[]) => this.vehiclesSubject.next(vehicles)),
        catchError(() => {
          this.vehiclesSubject.next([]);
          return of([]);
        }))
  }

  // Mappers
  private mapMovie(film: any): Movie {
    return {
      // SWAPI does not provide images, so we'll use images placeholder
      imageUrl: `${this.imagesPlaceholder}${encodeURIComponent(film.title)}`,
      imageAlt: film?.title ?? '',
      title: film?.title ?? '',
      director: film?.director ?? '',
      producers: typeof film.producer === 'string' ? film.producer.split(',').map((p: string) => p.trim()) : [],
      releaseDate: film?.release_date ?? '',
      url: film?.url ?? '',
      episodeId: film?.episode_id ?? '',
      openingCrawl: film?.opening_crawl ?? '',
      characters: Array.isArray(film.characters) ? film.characters : [],
      planets: Array.isArray(film.planets) ? film.planets : [],
      starships: Array.isArray(film.starships) ? film.starships : [],
      vehicles: Array.isArray(film.vehicles) ? film.vehicles : []
    };
  }

  private mapPerson(p: any): Person {
    const displayName = p?.name ?? '';
    return {
      name: displayName,
      gender: p?.gender ?? '',
      hairColor: p?.hair_color ?? '',
      eyeColor: p?.eye_color ?? '',
      birthYear: p?.birth_year ?? '',
      heightCm: p?.height ?? '',
      massKg: p?.mass ?? '',
      films: Array.isArray(p?.films) ? p.films : [],
      planets: Array.isArray(p?.planets) ? p.planets : [],
      starships: Array.isArray(p?.starships) ? p.starships : [],
      vehicles: Array.isArray(p?.vehicles) ? p.vehicles : [],
      homeworld: p?.homeworld ?? '',
      imageUrl: `${this.imagesPlaceholder}${encodeURIComponent(displayName)}`,
      imageAlt: displayName,
      url: p?.url ?? ''
    };
  }

  private mapPlanet(p: any): Planet {
    const displayName= p?.name ?? '';
    return {
      name: displayName,
      climate: p?.climate ?? '',
      terrain: p?.terrain ?? '',
      population: p?.population ?? '',
      diameterKm: p?.diameter ?? '',
      gravity: p?.gravity ?? '',
      films: Array.isArray(p?.films) ? p.films : [],
      people: Array.isArray(p?.residents) ? p.films : [],
      starships: Array.isArray(p?.starships) ? p.starships : [],
      vehicles: Array.isArray(p?.vehicles) ? p.vehicles : [],
      imageUrl: `${this.imagesPlaceholder}${encodeURIComponent(displayName)}`,
      imageAlt: displayName,
      url: p?.url
    };
  }

  private mapStarship(s: any): Starship {
    return {
      name: s?.name ?? '',
      url: s?.url ?? ''
    };
  }

  private mapVehicle(v: any): Vehicle {
    return {
      name: v?.name ?? '',
      url: v?.url ?? ''
    };
  }
}
