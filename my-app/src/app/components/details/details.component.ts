import {ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { BehaviorSubject, map } from 'rxjs';
import { Router } from '@angular/router';
import { extractFilmId } from '../../utils/swapi-url';
import {AddFilmComponent} from "../../forms/add-film.component";

export interface DetailItem {
  label: string;
  value: string;
}

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, NgIf, NgForOf, AddFilmComponent],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsComponent implements OnChanges {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() details: DetailItem[] = [];
  @Input() planet?: string;
  @Input() films: string[] = [];
  @Input() imageUrl: string = '';
  @Input() dotsCount: number = 3;
  showAddFilmModal: boolean = false;
  private maxCollapsedCount: number = 5;

  constructor(private router: Router) {}

  // Films chips collapse/expand
  showAllFilms: boolean = false;
  get displayedFilms(): string[] {
    return this.showAllFilms ? this.films : this.films.slice(0, this.maxCollapsedCount);
  }
  isMoreThanMax(): boolean {
    return (this.films?.length || 0) > this.maxCollapsedCount;
  }
  // Image carousel state
  images: string[] = [];
  private currentImageIndexSubject = new BehaviorSubject<number>(0);
  currentImageIndex$ = this.currentImageIndexSubject.asObservable();
  currentImage$ = this.currentImageIndex$.pipe(map(idx => this.images[idx]));

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
    this.currentImageIndexSubject.next(0);
  }

  selectImage(index: number): void {
    if (index >= 0 && index < this.images.length) {
      this.currentImageIndexSubject.next(index);
    }
  }

  openAddFilmPopup() {
    this.showAddFilmModal = true;
  }

  closeAddFilmModal(): void {
    this.showAddFilmModal = false;
  }

  // Convert a SWAPI film URL like "https://swapi.dev/api/films/1/" to a readable label like "Film 1"
  formatFilm(film: string): string {
    const id = extractFilmId(film);
    return id ? `Film ${id}` : (film || '');
  }

  // Navigate to the film details route based on the film URL id
  navigateToFilm(film: string): void {
    const id = extractFilmId(film);
    if (id) {
      this.router.navigate(['/films-detail', id]);
    }
  }
}
