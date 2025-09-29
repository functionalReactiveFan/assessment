import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';

export function fetchWithCache<T>(
  http: HttpClient,
  endpoint: string,
  mapper: (item: any) => any,
  subject: BehaviorSubject<any[]>,
  loaded: boolean,
  forceRefresh: boolean = false
): Observable<any[]> {
  if (!loaded || forceRefresh) {
    http
      .get<any>(endpoint)
      .pipe(
        map(response => response.results.map((item: any) => mapper(item))),
        tap(items => {
          loaded = true;
          subject.next(items);
        }),
        catchError(() => {
          loaded = false;
          subject.next([]);
          return of([]);
        })
      )
      .subscribe();
  }
  return subject.asObservable();
}


