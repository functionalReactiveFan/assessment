import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { Router } from '@angular/router';
import {
  extractId,
  PEOPLE_ID_REGEX,
  PLANETS_ID_REGEX,
  FILMS_ID_REGEX,
  MAX_CHARACTERS_CHIPS,
  MAX_FILMS_CHIPS, MAX_PLANETS_CHIPS, MAX_STARSHIPS_CHIPS, MAX_VEHICLES_CHIPS
} from '../../utils/helpers';
import { combineLatest } from "rxjs";
import { ApisService } from "../../services/apis.service";
import { Planet } from "../../models/planet.model";
import { Starship } from "../../models/starship.model";
import { Person } from "../../models/person.model";
import { Vehicle } from "../../models/vehicle.model";

export interface DetailItem {
  label: string;
  value: string;
}

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsComponent implements OnChanges, OnInit {
  @Input() title: string = '';
  @Input() mode: string = '';
  @Input() subtitle: string = '';
  @Input() details: DetailItem[] = [];
  @Input() homeworld: string = '';
  @Input() filmsUrls: string[] = [];
  @Input() planetsUrls: string[] = [];
  @Input() peopleUrls: string[] = [];
  @Input() starshipsUrls: string[] = [];
  @Input() vehiclesUrls: string[] = [];
  @Input() imageUrl: string = '';
  @Input() dotsCount: number = 3;
  showAddFilmModal: boolean = false;
  showAddPlanetModal: boolean = false;

  allCharacters: Person[] = [];
  renderedCharacters: Person[] = [];
  allPlanets: Planet[] = [];
  renderedPlanets: Planet[] = [];
  allStarships: string[] = [];
  renderedStarships: string[] = [];
  allVehicles: string[] = [];
  renderedVehicles: string[] = [];
  renderedHomeworld: any = {};

  constructor(
    private router: Router,
    private apis: ApisService,
    private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    combineLatest(
      this.apis.getPlanets(),
      this.apis.getVehicles(),
      this.apis.getPeople(),
      this.apis.getStarships())
      .subscribe(([planets, vehicles, people, starships])=> {
        const peopleBuffer: Person[] = Array.isArray(people) ? people : [];
        const starshipsBuffer: Starship[] = Array.isArray(starships) ? starships : [];
        const vehiclesBuffer: Vehicle[] = Array.isArray(vehicles) ? vehicles : [];
        const planetsBuffer: Planet[] = Array.isArray(planets) ? planets : [];

        this.allCharacters = peopleBuffer
          .filter((character: Person) => this.peopleUrls?.includes(character.url));
        this.renderedCharacters = this.allCharacters.slice(0, MAX_CHARACTERS_CHIPS);
        this.allStarships = starshipsBuffer
          .filter((starship: Starship) => this.starshipsUrls?.includes(starship.url))
          .map((starship: Starship) => starship.name);
        this.renderedStarships = this.allStarships.slice(0, MAX_STARSHIPS_CHIPS);
        this.allVehicles = vehiclesBuffer
          .filter((vehicle: Vehicle) => this.vehiclesUrls?.includes(vehicle.url))
          .map((vehicle: Vehicle) => vehicle.name);
        this.renderedVehicles = this.allVehicles?.slice(0, MAX_VEHICLES_CHIPS);

        // For planet, we need to get the homeworld as a first person from the people list, cause SWAPI does not provide all info
        this.renderedHomeworld = this.mode === 'planet'
          ? peopleBuffer.find((person: Person) => person.url === this.peopleUrls[0])
          : planetsBuffer.find((planet: Planet) => planet.url === this.homeworld);

        // For character, we need to get the planets as from homeworld data, cause SWAPI does not provide all info
        this.allPlanets = this.mode === 'character'
          ? [this.renderedHomeworld]
          : planetsBuffer.filter((planet: Planet) => this.planetsUrls.includes(planet.url));
        this.renderedPlanets = this.allPlanets.slice(0, MAX_PLANETS_CHIPS);

        // To make sure that result data being rendered
        this.cdr.markForCheck();
      });
  }

  get displayedFilmsUrls(): string[] {
    return this.filmsUrls.slice(0, MAX_FILMS_CHIPS);
  }

  isFilmsMoreThanMax(): boolean {
    return this.filmsUrls.length > MAX_FILMS_CHIPS;
  }

  isPlanetsMoreThanMax(): boolean {
    return this.planetsUrls.length > MAX_PLANETS_CHIPS;
  }

  isStarshipsMoreThanMax(): boolean {
    return this.starshipsUrls.length > MAX_STARSHIPS_CHIPS;
  }

  isVehiclesMoreThanMax(): boolean {
    return this.vehiclesUrls.length > MAX_VEHICLES_CHIPS;
  }

  images: string[] = [];
  currentImageIndex: number = 0;

  get currentImage(): string {
    return this.images[this.currentImageIndex];
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Build images array whenever inputs change
    const count = Math.max(1, Math.floor(this.dotsCount || 1));
    const titleText = this.title || 'Image';

    const images: string[] = [];

    // Use provided imageUrl
    if (this.imageUrl) {
      images.push(this.imageUrl);
    } else {
      images.push(`https://placehold.co/500x350/20232A/FFFFFF?text=${encodeURIComponent(titleText + ' 1')}`);
    }

    // Fill remaining images with placeholders based on the title
    for (let i = images.length; i < count; i++) {
      images.push(`https://placehold.co/500x350/20232A/FFFFFF?text=${encodeURIComponent(titleText + ' ' + (i + 1))}`);
    }

    this.images = images;
    this.currentImageIndex = 0;
  }

  selectImage(index: number): void {
    if (index >= 0 && index < this.images.length) {
      this.currentImageIndex = index;
    }
  }

  navigateToPlanet(url: string): void {
    const id = extractId(url, PLANETS_ID_REGEX);
    if (id) {
      this.router.navigate(['/planets', id]);
    }
  }

  navigateToCharacter(url: string): void {
    const id = extractId(url, PEOPLE_ID_REGEX);
    if (id) {
      this.router.navigate(['/people', id]);
    }
  }

  redirectTo(mode: string, url: string): void {
    // If the mode is 'planet', we need to navigate to the character detail page
    if (mode === 'planet') this.navigateToCharacter(url);
    // If the mode is 'character', we need to navigate to the planet detail page
    if (mode === 'character') this.navigateToPlanet(url);
  }

  openAddFilmPopup(): void {
    this.showAddFilmModal = true;
  }

  openAddPlanetPopup(): void {
    this.showAddPlanetModal = true;
  }

  closeAddFilmModal(): void {
    this.showAddFilmModal = false;
    this.router.navigate(['/films']);
  }

  closeAddPlanetModal(): void {
    this.showAddPlanetModal = false;
    this.router.navigate(['/planets']);
  }

  // Convert a SWAPI film URL like "https://swapi.dev/api/films/1/" to a readable label like "Film 1"
  formatFilm(filmUrl: string): string {
    const id = extractId(filmUrl, FILMS_ID_REGEX);
    return id ? `Film ${id}` : (filmUrl || '');
  }

  // Navigate to the film details route based on the film URL id
  navigateToFilm(film: string): void {
    const id = extractId(film, FILMS_ID_REGEX);
    if (id) {
      this.router.navigate(['/films', id]);
    }
  }
}
