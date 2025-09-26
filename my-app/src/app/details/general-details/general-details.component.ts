import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule, NgForOf, NgIf } from '@angular/common';

export interface DetailItem {
  label: string;
  value: string;
}

@Component({
  selector: 'app-general-details',
  standalone: true,
  imports: [CommonModule, NgIf, NgForOf],
  templateUrl: './general-details.component.html',
  styleUrls: ['./general-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeneralDetailsComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() details: DetailItem[] = [];
  @Input() planet?: string;
  @Input() films: string[] = [];
  @Input() imageUrl: string = '';
  @Input() dotsCount: number = 3;
  private maxCollapsedCount: number = 5;

  showAllFilms: boolean = false;
  get displayedFilms(): string[] {
    return this.showAllFilms ? this.films : this.films.slice(0, this.maxCollapsedCount);
  }
  isMoreThanMax(): boolean {
    return (this.films?.length || 0) > this.maxCollapsedCount;
  }
  toggleFilms(): void {
    this.showAllFilms = !this.showAllFilms;
  }

  // Convert a SWAPI film URL like "https://swapi.dev/api/films/1/" to a readable label like "Film 1"
  formatFilm(film: string | null | undefined): string {
    if (!film) return '';
    const match = film.match(/films\/(\d+)\/?$/);
    return match ? `Film ${match[1]}` : film;
  }
}
