import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, catchError, map, Observable, of, tap} from 'rxjs';

import { Movie } from '../models/movie.model';
import { Person } from '../models/person.model';
import { Planet } from '../models/planet.model';
import {Starship} from "../models/starship.model";
import {Vehicle} from "../models/vehicle.model";

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

  getPersonById(id: number | string): Observable<any> {
    const url = `${this.peopleEndpoint}${id}/`;
    return this.http.get<any>(url);
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

  getPlanetById(id: number | string): Observable<any> {
    const url = `${this.planetsEndpoint}${id}/`;
    return this.http.get<any>(url);
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

  private mapStarship(s: any): Starship {
    return {
      name: s.name,
      url: s.url
    };
  }

  private mapVehicle(v: any): Vehicle {
    return {
      name: v.name,
      url: v.url
    };
  }
}
