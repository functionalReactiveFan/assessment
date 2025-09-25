import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Person } from '../models/person.model';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  private readonly peopleEndpoint = 'https://swapi.dev/api/people/';

  constructor(private http: HttpClient) {}

  getPeople(): Observable<Person[]> {
    return this.http
      .get<{ count: number; next: string | null; previous: string | null; results: any[] }>(this.peopleEndpoint)
      .pipe(map(res => res.results.map(p => this.mapPerson(p))));
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



