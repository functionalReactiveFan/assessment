import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BehaviorSubject, combineLatest} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {MovieService} from '../../services/movie.service';
import {extractPeopleId} from '../../utils/swapi-url';
import {PeopleService} from "../../services/people.service";
import { AddCharacterComponent } from '../../forms/add-character.component';

interface FilmDetails {
  director: string;
  producers: string;
  releaseDate: string;
}

interface Character {
  name: string;
  url: string;
}

@Component({
  selector: 'app-film-details',
  standalone: true,
  imports: [CommonModule, AddCharacterComponent],
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

  // Toggle state for showing all characters vs first three
  showAllCharacters: boolean = false;
  // Controls visibility of Add Character modal
  showAddCharacterModal: boolean = false;
  get displayedCharacters(): Character[] {
    return this.showAllCharacters ? this.characters : this.characters.slice(0, 3);
  }

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

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private peopleService: PeopleService,
    private cdr: ChangeDetectorRef,
    private router: Router) {
    // Preload placeholder image
    this.images[0] = 'https://placehold.co/600x400';

    // Load film by id from route
    this.route.paramMap.pipe(
      map(params => params.get('id')),
      switchMap(id => combineLatest(this.movieService.getMovieById(id || '1'), this.peopleService.getPeople()))
    ).subscribe(([film, people]) => {
      this.title = film?.title || 'Unbekannter Film';
      this.episodeTitle = film?.episode_id ? `Episode ${film.episode_id}` : '';
      this.filmDetails = {
        director: film?.director || 'Unbekannt',
        producers: typeof film?.producer === 'string' ? film.producer : '',
        releaseDate: film?.release_date || ''
      };
      this.synopsis = film?.opening_crawl || '';
      const chars = Array.isArray(film?.characters) ? film.characters : [];
      this.characters = people.filter(p => chars.includes(p.url));
      // carousel placeholders
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

  toggleCharacters(): void {
    this.showAllCharacters = !this.showAllCharacters;
    // With OnPush, events already trigger change detection; this is mostly for clarity.
    this.cdr.markForCheck();
  }

  openAddCharacterModal(): void {
    this.showAddCharacterModal = true;
    this.cdr.markForCheck();
  }

  closeAddCharacterModal(): void {
    this.showAddCharacterModal = false;
    this.cdr.markForCheck();
  }

  isMoreThanTree(): boolean {
    return this.characters.length > 3;
  }

  navigateToCharacter(url: string): void {
    const id = extractPeopleId(url);
    if (id) {
      this.router.navigate(['/character-detail', id]);
    }
  }

  private formatCharacter(url: string): string {
    const id = extractPeopleId(url);
    return id ? `Charakter ${id}` : (url || '');
  }
}
