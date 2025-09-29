import {ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import {extractId, FILMS_ID_REGEX} from '../../utils/swapi-url';
import {AddFilmComponent} from "../../forms/add-film.component";
import {AddPlanetComponent} from "../../forms/add-planet.component";
import {combineLatest} from "rxjs";
import {ApisService} from "../../services/apis.service";

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
  private maxCollapsedCount: number = 5;

  constructor(private router: Router, private apis: ApisService) {
    combineLatest(
      this.apis.getPlanets(),
      this.apis.getVehicles(),
      this.apis.getPeople(),
      this.apis.getStarships()).subscribe(([planets, vehicles, people, starships]) => {

    })
  }

  get displayedFilms(): string[] {
    return this.filmsUrls.slice(0, this.maxCollapsedCount);
  }
  isMoreThanMax(): boolean {
    return (this.filmsUrls?.length || 0) > this.maxCollapsedCount;
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

    // Use provided imageUrl as the first image if available
    if (this.imageUrl) {
      images.push(this.imageUrl);
    } else {
      images.push(`https://placehold.co/500x350/20232A/FFFFFF?text=${encodeURIComponent(titleText + ' 1')}`);
    }

    // Fill remaining images with placeholders based on title
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
