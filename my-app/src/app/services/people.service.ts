import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Person } from '../models/person.model';
import { fetchWithCache, LoadedRef } from './shared/fetch-cache';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  private readonly peopleEndpoint = 'https://swapi.dev/api/people/';
  private readonly peopleSubject = new BehaviorSubject<Person[]>([]);
  private peopleLoadedRef: LoadedRef = { value: false };

  constructor(private http: HttpClient) {}

  getPeople(forceRefresh: boolean = false): Observable<Person[]> {
    return fetchWithCache<Person>(
      this.http,
      this.peopleEndpoint,
      p => this.mapPerson(p),
      this.peopleSubject,
      this.peopleLoadedRef,
      forceRefresh
    );
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
      imageAlt: displayName
    };
  }
}



