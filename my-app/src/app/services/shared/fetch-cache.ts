import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';

export interface LoadedRef { value: boolean; }

export function fetchWithCache<T>(
  http: HttpClient,
  endpoint: string,
  mapper: (item: any) => T,
  subject: BehaviorSubject<T[]>,
  loadedRef: LoadedRef,
  forceRefresh: boolean = false
): Observable<T[]> {
  if (!loadedRef.value || forceRefresh) {
    http
      .get<{ count: number; next: string | null; previous: string | null; results: any[] }>(endpoint)
      .pipe(
        map(response => response.results.map(item => mapper(item))),
        tap(items => {
          loadedRef.value = true;
          subject.next(items);
        }),
        catchError(() => {
          loadedRef.value = false;
          subject.next([]);
          return of([]);
        })
      )
      .subscribe();
  }
  return subject.asObservable();
}


