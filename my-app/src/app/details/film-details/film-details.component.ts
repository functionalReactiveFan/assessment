import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { ChangeDetectorRef } from '@angular/core';

interface FilmDetails {
  director: string;
  producers: string;
  releaseDate: string;
}

interface Character {
  name: string;
}

@Component({
  selector: 'app-film-details',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.scss']
})
export class FilmDetailsComponent {
  // Header fields
  title: string = '';
  episodeTitle: string = '';

  // Detail fields
  filmDetails: FilmDetails = {
    director: '',
    producers: '',
    releaseDate: ''
  };

  synopsis: string = '';

  characters: Character[] = [];

  images: string[] = [
    'https://placehold.co/600x400/000000/FFFFFF?text=Scene+1',
    'https://placehold.co/600x400/000000/FFFFFF?text=Scene+2',
    'https://placehold.co/600x400/000000/FFFFFF?text=Scene+3'
  ];

  private currentImageIndexSubject = new BehaviorSubject<number>(0);
  currentImageIndex$ = this.currentImageIndexSubject.asObservable();

  currentImage$ = this.currentImageIndex$.pipe(
    map(index => this.images[index])
  );

  constructor(private route: ActivatedRoute, private movieService: MovieService, private cdr: ChangeDetectorRef) {
    // Preload placeholder image
    this.images[0] = 'https://placehold.co/600x400';

    // Load film by id from route
    this.route.paramMap.pipe(
      map(params => params.get('id')),
      switchMap(id => this.movieService.getMovieById(id || '1'))
    ).subscribe(film => {
      this.title = film?.title || 'Unbekannter Film';
      this.episodeTitle = film?.episode_id ? `Episode ${film.episode_id}` : '';
      this.filmDetails = {
        director: film?.director || 'Unbekannt',
        producers: typeof film?.producer === 'string' ? film.producer : '',
        releaseDate: film?.release_date || ''
      };
      this.synopsis = film?.opening_crawl || '';
      const chars = Array.isArray(film?.characters) ? film.characters : [];
      this.characters = chars.map((u: string) => ({ name: this.formatCharacter(u) }));
      // Update carousel placeholders to include title text
      this.images = [
        `https://placehold.co/600x400/000000/FFFFFF?text=${encodeURIComponent(this.title + ' 1')}`,
        `https://placehold.co/600x400/000000/FFFFFF?text=${encodeURIComponent(this.title + ' 2')}`,
        `https://placehold.co/600x400/000000/FFFFFF?text=${encodeURIComponent(this.title + ' 3')}`
      ];
      this.currentImageIndexSubject.next(0);
      this.cdr.markForCheck();
    });
  }

  selectImage(index: number): void {
    this.currentImageIndexSubject.next(index);
  }

  isMoreThanTree(): boolean {
    return this.characters.length > 3;
  }

  private formatCharacter(url: string | null | undefined): string {
    if (!url) return '';
    const match = url.match(/people\/(\d+)\/?$/);
    return match ? `Charakter ${match[1]}` : url;
  }
}
