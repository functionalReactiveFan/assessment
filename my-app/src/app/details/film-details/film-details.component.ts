import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {combineLatest} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {ApisService} from '../../services/apis.service';
import {extractId, PEOPLE_ID_REGEX, PLANETS_ID_REGEX} from '../../utils/helpers';
import {Starship} from "../../models/starship.model";
import {Person} from "../../models/person.model";
import {Vehicle} from "../../models/vehicle.model";
import {Planet} from "../../models/planet.model";

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

  allCharacters: Character[] = [];
  renderedCharacters: Character[] = [];
  allPlanets: Planet[] = [];
  renderedPlanets: Planet[] = [];
  allStarships: string[] = [];
  renderedStarships: string[] = [];
  allVehicles: string[] = [];
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

    this.route.paramMap
      .pipe(
        map(params => params.get('id')),
        switchMap(id =>
          combineLatest(
            this.apis.getMovieById(id || '1'),
            this.apis.getPlanets(),
            this.apis.getVehicles(),
            this.apis.getPeople(),
            this.apis.getStarships())
          ))
        .subscribe(([film, planets, vehicles, people, starships]) => {
      this.title = film?.title || '';
      this.episodeTitle = film?.episodeId ? `Episode ${film.episodeId}` : '';
      this.filmDetails = {
        director: film?.director || '',
        producers: Array.isArray(film?.producers) ? film.producers.join(', ') : '',
        releaseDate: film?.releaseDate || ''
      };
      this.synopsis = film?.openingCrawl || '';
      const charactersBuffer = Array.isArray(film?.characters) ? film.characters : [];
      const starshipsBuffer: Starship[] = Array.isArray(starships) ? starships : [];
      const vehiclesBuffer: Vehicle[] = Array.isArray(vehicles) ? vehicles : [];
      const planetsBuffer: Planet[] = Array.isArray(planets) ? planets : [];
      this.allCharacters = people
        .filter((character: Person) => charactersBuffer.includes(character.url));
      this.renderedCharacters = this.allCharacters.slice(0, 3);
      this.allStarships = starshipsBuffer
        .filter((starship: Starship) => film?.starships?.includes(starship.url))
        .map((starship: Starship) => starship.name);
      this.renderedStarships = this.allStarships.slice(0, 3);
      this.allVehicles = vehiclesBuffer
        .filter((vehicle: Vehicle) => film?.vehicles?.includes(vehicle.url))
        .map((vehicle: Vehicle) => vehicle.name);
      this.renderedVehicles = this.allVehicles.slice(0, 3);
      this.allPlanets = planetsBuffer
        .filter((planet: Planet) => film?.planets?.includes(planet.url));
      this.renderedPlanets = this.allPlanets.slice(0, 2);

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
    this.router.navigate(['/people']);
  }

  openAddPlanetPopup(): void {
    this.showAddPlanetModal = true;
  }

  closeAddPlanetModal(): void {
    this.showAddPlanetModal = false;
    this.router.navigate(['/planets']);
  }

  isMoreThanTreeCharacters(): boolean {
    return this.allCharacters.length > 3;
  }

  isMoreThanTreeStarships(): boolean {
    return this.allStarships.length > 3;
  }

  isMoreThanTreeVehicles(): boolean {
    return this.allVehicles.length > 3;
  }

  isMoreThanTwoPlanets(): boolean {
    return this.allPlanets.length > 2;
  }

  navigateToCharacter(url: string): void {
    const id = extractId(url, PEOPLE_ID_REGEX);
    if (id) {
      this.router.navigate(['/people', id]);
    }
  }

  navigateToPlanet(url: string): void {
    const id = extractId(url, PLANETS_ID_REGEX);
    if (id) {
      this.router.navigate(['/planets', id]);
    }
  }

}
