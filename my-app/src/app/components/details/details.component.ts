import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { extractId, FILMS_ID_REGEX, PLANETS_ID_REGEX } from '../../utils/swapi-url';
import { AddFilmComponent } from "../../forms/add-film.component";
import { AddPlanetComponent } from "../../forms/add-planet.component";
import { combineLatest } from "rxjs";
import { ApisService } from "../../services/apis.service";
import { Planet } from "../../models/planet.model";
import { Starship } from "../../models/starship.model";
import { Person } from "../../models/person.model";
import { Vehicle } from "../../models/vehicle.model";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

export interface DetailItem {
  label: string;
  value: string;
}

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, NgIf, NgForOf, AddFilmComponent, AddPlanetComponent],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsComponent implements OnChanges {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() details: DetailItem[] = [];
  @Input() planet?: string;
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

  constructor(private router: Router, private apis: ApisService) {
    combineLatest(
      this.apis.getPlanets(),
      this.apis.getVehicles(),
      this.apis.getPeople(),
      this.apis.getStarships())
    .subscribe(([planets, vehicles, people, starships])=> {
      const starshipsBuffer: Starship[] = Array.isArray(starships) ? starships : [];
      const vehiclesBuffer: Vehicle[] = Array.isArray(vehicles) ? vehicles : [];
      const planetsBuffer: Planet[] = Array.isArray(planets) ? planets : [];
      this.allCharacters = people
        .filter((character: Person) => this.peopleUrls.includes(character.url));
      this.renderedCharacters = this.allCharacters.slice(0, 3);
      console.log('this.starshipsUrls',this.starshipsUrls);  // fix this maybe use other hook
      console.log('starshipsBuffer', starshipsBuffer);
      this.allStarships = starshipsBuffer
        .filter((starship: Starship) => this.starshipsUrls.includes(starship.url))
        .map((starship: Starship) => starship.name);
      console.log('this.allStarships',this.allStarships);
      this.renderedStarships = this.allStarships.slice(0, 3);
      console.log('this.renderedStarships',this.renderedStarships);
      this.allVehicles = vehiclesBuffer
        .filter((vehicle: Vehicle) => this.vehiclesUrls.includes(vehicle.url))
        .map((vehicle: Vehicle) => vehicle.name);
      this.renderedVehicles = this.allVehicles.slice(0, 3);
      this.allPlanets = planetsBuffer
        .filter((planet: Planet) => this.planetsUrls.includes(planet.url));
      this.renderedPlanets = this.allPlanets.slice(0, 2);
    })
  }

  get displayedFilmsUrls(): string[] {
    return this.filmsUrls.slice(0, 5);
  }

  get displayedStarships(): string[] {
    return this.renderedStarships
  }

  isFilmsMoreThanMax(): boolean {
    return this.filmsUrls.length > 5;
  }

  isPlanetsMoreThanMax(): boolean {
    return this.planetsUrls.length > 2;
  }

  isStarshipsMoreThanMax(): boolean {
    return this.starshipsUrls.length > 3;
  }

  isVehiclesMoreThanMax(): boolean {
    return this.vehiclesUrls.length > 3;
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
      this.router.navigate(['/planet-detail', id]);
    }
  }

  openAddFilmPopup(): void {
    this.showAddFilmModal = true;
  }

  openAddPlanetPopup(): void {
    this.showAddPlanetModal = true;
  }

  closeAddFilmModal(): void {
    this.showAddFilmModal = false;
    this.router.navigate(['/films-list']);
  }

  closeAddPlanetModal(): void {
    this.showAddPlanetModal = false;
    this.router.navigate(['/planets-list']);
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
      this.router.navigate(['/films-detail', id]);
    }
  }
}
