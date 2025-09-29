import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {combineLatest} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {ApisService} from '../../services/apis.service';
import {extractPeopleId} from '../../utils/swapi-url';
import { AddCharacterComponent } from '../../forms/add-character.component';
import {AddPlanetComponent} from "../../forms/add-planet.component";
import {Starship} from "../../models/starship.model";
import {Person} from "../../models/person.model";

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
  imports: [CommonModule, AddCharacterComponent, AddPlanetComponent],
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

  renderedCharacters: Character[] = [];
  renderedStarships: string[] = [];
  renderedVehicles: string[] = [];

  // Controls visibility of modals
  showAddCharacterModal: boolean = false;
  showAddPlanetModal: boolean = false;

  images: string[] = [
    'https://placehold.co/600x400/000000/FFFFFF?text=Scene+1',
    'https://placehold.co/600x400/000000/FFFFFF?text=Scene+2',
    'https://placehold.co/600x400/000000/FFFFFF?text=Scene+3'
  ];

  currentImageIndex: number = 0;
  get currentImage(): string {
    return this.images[this.currentImageIndex];
  }

  constructor(
    private route: ActivatedRoute,
    private apis: ApisService,
    private cdr: ChangeDetectorRef,
    private router: Router) {
    // Preload placeholder image
    this.images[0] = 'https://placehold.co/600x400';

    // Load film by id from route
    this.route.paramMap.pipe(
      map(params => params.get('id')),
      switchMap(id =>
        combineLatest(
          this.apis.getMovieById(id || '1'),
          this.apis.getPeople(),
          this.apis.getStarships()))
    ).subscribe(([film, people, starships]) => {
      this.title = film?.title || 'Unbekannter Film';
      this.episodeTitle = film?.episode_id ? `Episode ${film.episode_id}` : '';
      this.filmDetails = {
        director: film?.director || 'Unbekannt',
        producers: typeof film?.producer === 'string' ? film.producer : '',
        releaseDate: film?.release_date || ''
      };
      this.synopsis = film?.opening_crawl || '';
      const characters = Array.isArray(film?.characters) ? film.characters : [];
      this.renderedCharacters = people.filter((character: Person) => characters.includes(character.url)).slice(0, 3);
      const ships: Starship[] = Array.isArray(starships) ? starships : [];
      this.renderedStarships = ships
        .filter((starship: Starship) => film?.starships?.includes(starship.url))
        .map((starship: Starship) => starship.name);

      // Since SWAPI does not provide images, we can emulate carousel placeholders
      this.images = [
        `https://placehold.co/600x400/000000/FFFFFF?text=${encodeURIComponent(this.title + ' 1')}`,
        `https://placehold.co/600x400/000000/FFFFFF?text=${encodeURIComponent(this.title + ' 2')}`,
        `https://placehold.co/600x400/000000/FFFFFF?text=${encodeURIComponent(this.title + ' 3')}`
      ];
      this.currentImageIndex = 0;
      this.cdr.markForCheck();
    });
  }

  selectImage(index: number): void {
    if (index >= 0 && index < this.images.length) {
      this.currentImageIndex = index;
    }
  }

  openAddCharacterModal(): void {
    this.showAddCharacterModal = true;
  }

  closeAddCharacterModal(): void {
    this.showAddCharacterModal = false;
    this.router.navigate(['/people-list']);
  }

  openAddPlanetPopup(): void {
    this.showAddPlanetModal = true;
  }

  closeAddPlanetModal(): void {
    this.showAddPlanetModal = false;
    this.router.navigate(['/planets-list']);
  }

  isMoreThanTreeCharacters(): boolean {
    return this.renderedCharacters.length > 3;
  }

  isMoreThanTreeStarships(): boolean {
    return this.renderedStarships.length > 3;
  }

  isMoreThanTreeVehicles(): boolean {
    return this.renderedVehicles.length > 3;
  }

  navigateToCharacter(url: string): void {
    const id = extractPeopleId(url);
    if (id) {
      this.router.navigate(['/character-detail', id]);
    }
  }

}
