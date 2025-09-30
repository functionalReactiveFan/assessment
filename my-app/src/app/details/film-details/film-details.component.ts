import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {combineLatest} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {ApisService} from '../../services/apis.service';
import {
  createMockImage,
  extractId,
  MAX_CHARACTERS_CHIPS, MAX_PLANETS_CHIPS,
  MAX_STARSHIPS_CHIPS, MAX_VEHICLES_CHIPS,
  PEOPLE_ID_REGEX,
  PLANETS_ID_REGEX
} from '../../utils/helpers';
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

  images: string[] = [];
  currentImageIndex: number = 0;

  get currentImage(): string {
    return this.images[this.currentImageIndex];
  }

  constructor(
    private route: ActivatedRoute,
    private apis: ApisService,
    private cdr: ChangeDetectorRef,
    private router: Router) {
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
        this.title = film?.title ?? '';
        this.episodeTitle = film?.episodeId ? `Episode ${film.episodeId}` : '';
        this.filmDetails = {
          director: film?.director ?? '',
          producers: Array.isArray(film?.producers) ? film.producers.join(', ') : '',
          releaseDate: film?.releaseDate ?? ''
        };
        this.synopsis = film?.openingCrawl ?? '';

        const charactersBuffer = Array.isArray(film?.characters) ? film.characters : [];
        const starshipsBuffer: Starship[] = Array.isArray(starships) ? starships : [];
        const vehiclesBuffer: Vehicle[] = Array.isArray(vehicles) ? vehicles : [];
        const planetsBuffer: Planet[] = Array.isArray(planets) ? planets : [];

        this.allCharacters = people
          .filter((character: Person) => charactersBuffer.includes(character.url));
        this.renderedCharacters = this.allCharacters.slice(0, MAX_CHARACTERS_CHIPS);
        this.allStarships = starshipsBuffer
          .filter((starship: Starship) => film?.starships?.includes(starship.url))
          .map((starship: Starship) => starship.name);
        this.renderedStarships = this.allStarships.slice(0, MAX_STARSHIPS_CHIPS);
        this.allVehicles = vehiclesBuffer
          .filter((vehicle: Vehicle) => film?.vehicles?.includes(vehicle.url))
          .map((vehicle: Vehicle) => vehicle.name);
        this.renderedVehicles = this.allVehicles.slice(0, MAX_VEHICLES_CHIPS);
        this.allPlanets = planetsBuffer
          .filter((planet: Planet) => film?.planets?.includes(planet.url));
        this.renderedPlanets = this.allPlanets.slice(0, MAX_PLANETS_CHIPS);

        // Since SWAPI does not provide images, we can emulate carousel placeholders
        this.images = [
          createMockImage(this.title + ' 1'),
          createMockImage(this.title + ' 2'),
          createMockImage(this.title + ' 3'),
        ];
        this.currentImageIndex = 0;

        // To make sure that result data being rendered
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

  isMoreThanMaxCharacters(): boolean {
    return this.allCharacters.length > MAX_CHARACTERS_CHIPS;
  }

  isMoreThanMaxStarships(): boolean {
    return this.allStarships.length > MAX_STARSHIPS_CHIPS;
  }

  isMoreThanMaxVehicles(): boolean {
    return this.allVehicles.length > MAX_VEHICLES_CHIPS;
  }

  isMoreThanMaxPlanets(): boolean {
    return this.allPlanets.length > MAX_PLANETS_CHIPS;
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
