import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private movies$ = new BehaviorSubject<Movie[]>([
    {
      imageUrl: 'https://placehold.co/400x300/000000/FFFFFF',
      imageAlt: 'Close-up portrait of Queen Amidala in her ornate red and gold royal attire and white face makeup.',
      title: 'Thumbnail label',
      director: 'George Lucas',
      producers: ['Gary Kurtz', 'Rick McCallum'],
      releaseDate: '25.05.1977'
    },
    {
      imageUrl: 'https://placehold.co/400x300/000000/FFFFFF',
      imageAlt: 'Close-up shot of Kylo Ren\'s menacing silver and black helmet with red accents, against a dark background.',
      title: 'Thumbnail label',
      director: 'George Lucas',
      producers: ['Gary Kurtz', 'Rick McCallum'],
      releaseDate: '25.05.1977'
    },
    {
      imageUrl: 'https://placehold.co/400x300/000000/FFFFFF',
      imageAlt: 'Portrait of a thoughtful Obi-Wan Kenobi with a beard, wearing Jedi robes.',
      title: 'Thumbnail label',
      director: 'George Lucas',
      producers: ['Gary Kurtz', 'Rick McCallum'],
      releaseDate: '25.05.1977'
    }
  ]);

  constructor() { }

  getMovies(): Observable<Movie[]> {
    return this.movies$.asObservable();
  }
}