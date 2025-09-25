import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Planet } from '../models/planet.model';
import { fetchWithCache, LoadedRef } from './shared/fetch-cache';

@Injectable({ providedIn: 'root' })
export class PlanetService {
  private readonly planetsEndpoint = 'https://swapi.dev/api/planets/';
  private readonly planetsSubject = new BehaviorSubject<Planet[]>([]);
  private planetsLoadedRef: LoadedRef = { value: false };

  constructor(private http: HttpClient) {}

  getPlanets(forceRefresh: boolean = false): Observable<Planet[]> {
    return fetchWithCache<Planet>(
      this.http,
      this.planetsEndpoint,
      p => this.mapPlanet(p),
      this.planetsSubject,
      this.planetsLoadedRef,
      forceRefresh
    );
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


