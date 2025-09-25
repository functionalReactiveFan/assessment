import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { Planet } from '../models/planet.model';

@Injectable({ providedIn: 'root' })
export class PlanetService {
  private readonly planetsEndpoint = 'https://swapi.dev/api/planets/';
  private readonly planetsSubject = new BehaviorSubject<Planet[]>([]);
  private planetsLoaded = false;

  constructor(private http: HttpClient) {}

  getPlanets(forceRefresh: boolean = false): Observable<Planet[]> {
    if (!this.planetsLoaded || forceRefresh) {
      this.http
        .get<{ count: number; next: string | null; previous: string | null; results: any[] }>(this.planetsEndpoint)
        .pipe(
          map(res => res.results.map(p => this.mapPlanet(p))),
          tap(planets => {
            this.planetsLoaded = true;
            this.planetsSubject.next(planets);
          }),
          catchError(() => {
            this.planetsLoaded = false;
            this.planetsSubject.next([]);
            return of([]);
          })
        )
        .subscribe();
    }
    return this.planetsSubject.asObservable();
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
      imageUrl: `https://placehold.co/400x300/14213d/ffffff?text=${encodeURIComponent(displayName)}`,
      imageAlt: displayName
    };
  }
}


