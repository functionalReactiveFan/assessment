import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { Person } from '../models/person.model';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  private readonly peopleEndpoint = 'https://swapi.dev/api/people/';
  private readonly peopleSubject = new BehaviorSubject<Person[]>([]);
  private peopleLoaded = false;

  constructor(private http: HttpClient) {}

  getPeople(forceRefresh: boolean = false): Observable<Person[]> {
    if (!this.peopleLoaded || forceRefresh) {
      this.http
        .get<{ count: number; next: string | null; previous: string | null; results: any[] }>(this.peopleEndpoint)
        .pipe(
          map(res => res.results.map(p => this.mapPerson(p))),
          tap(people => {
            this.peopleLoaded = true;
            this.peopleSubject.next(people);
          }),
          catchError(() => {
            this.peopleLoaded = false;
            this.peopleSubject.next([]);
            return of([]);
          })
        )
        .subscribe();
    }
    return this.peopleSubject.asObservable();
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



