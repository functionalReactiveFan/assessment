import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

interface FilmDetails {
  director: string;
  producers: string;
  releaseDate: string;
}

interface Character {
  name: string;
}

@Component({
  selector: 'detail-view',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container">
      <header class="header">
        <p class="pre-title">Filmdeatils</p>
        <div class="title-divider"></div>
        <h1 class="main-title">Filmtitel</h1>
        <h2 class="episode-title">Episode V</h2>
      </header>
      <main class="grid-container">
        <div class="left-column">
          <section class="details-section">
            <h3>Details:</h3>
            <p class="details-item"><strong>Director:</strong> {{ filmDetails.director }}</p>
            <p class="details-item"><strong>Produzenten:</strong> {{ filmDetails.producers }}</p>
            <p class="details-item"><strong>Erscheinungsdatum:</strong> {{ filmDetails.releaseDate }}</p>
          </section>

          <p class="synopsis">{{ synopsis }}</p>

          <section class="characters-section">
            <h3>Charaktere:</h3>
            <div class="characters-list">
              <div *ngFor="let character of characters" class="character-chip">
                {{ character.name }}
              </div>
            </div>
          </section>
        </div>
        <div class="right-column">
          <div class="image-carousel">
            <img [src]="currentImage$ | async" alt="Close-up portrait of Queen Amidala in her ornate red and gold royal attire and traditional white face makeup with red markings." class="carousel-image">
            <div class="pagination">
              <span
                *ngFor="let image of images; let i = index"
                class="dot"
                [class.active]="(currentImageIndex$ | async) === i"
                (click)="selectImage(i)">
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .container {
      max-width: 1200px;
      margin: 4rem auto;
      padding: 2rem;
    }

    .header {
      text-align: center;
      margin-bottom: 4rem;
    }

    .pre-title {
      color: #6c757d;
      font-size: 1rem;
      letter-spacing: 1px;
      margin: 0;
    }

    .title-divider {
      width: 40px;
      height: 2px;
      background-color: #b0b0b0;
      margin: 0.75rem auto;
    }

    .main-title {
      font-size: 4.5rem;
      font-weight: 700;
      color: #1A2B48;
      margin: 0.5rem 0;
      line-height: 1.1;
    }

    .episode-title {
      font-size: 1.5rem;
      color: #6c757d;
      font-weight: 300;
      margin-top: 1rem;
    }

    .grid-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: start;
    }

    .left-column {
      max-width: 500px;
    }

    .details-section h3,
    .characters-section h3 {
      font-size: 1.5rem;
      font-weight: 600;
      color: #212529;
      margin-top: 0;
      margin-bottom: 1.5rem;
    }

    .details-item {
      margin-bottom: 0.75rem;
      font-size: 1rem;
      color: #495057;
    }

    .details-item strong {
      color: #212529;
      font-weight: 500;
    }

    .synopsis {
      margin-top: 2.5rem;
      line-height: 1.7;
      color: #495057;
      white-space: pre-wrap;
      font-size: 1rem;
    }

    .characters-section {
      margin-top: 3rem;
    }

    .characters-list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
    }

    .character-chip {
      background-color: #f1f3f5;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      font-size: 0.9rem;
      color: #495057;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .character-chip:hover {
        background-color: #e9ecef;
    }

    .right-column {
      padding-top: 1rem;
    }

    .image-carousel {
      position: relative;
    }

    .carousel-image {
      width: 100%;
      border-radius: 8px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.1);
      display: block;
    }

    .pagination {
      text-align: center;
      margin-top: 1.5rem;
    }

    .dot {
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: #ced4da;
      margin: 0 5px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .dot.active {
      background-color: #868e96;
    }

    @media (max-width: 992px) {
      .grid-container {
        grid-template-columns: 1fr;
        gap: 3rem;
      }
      .right-column {
        order: -1;
        padding-top: 0;
      }
      .left-column {
        max-width: 100%;
      }
      .header {
        margin-bottom: 3rem;
      }
      .main-title {
        font-size: 3.5rem;
      }
    }

    @media (max-width: 576px) {
      .container {
        padding: 1rem;
        margin: 2rem auto;
      }
      .main-title {
        font-size: 2.5rem;
      }
      .episode-title {
        font-size: 1.25rem;
      }
    }
  `]
})
export class DetailViewComponent {
  filmDetails: FilmDetails = {
    director: 'George Lucas',
    producers: 'Gary Kurtz, Rick McCallum',
    releaseDate: '25.05.1977'
  };

  synopsis: string = `It is a period of civil war.
Rebel spaceships, striking
from a hidden base, have won
their first victory against
the evil Galactic Empire.

During the battle, Rebel
spies managed to steal secret
plans to the Empire's
ultimate weapon, the DEATH
STAR, an armored space
station with enough power
to destroy an entire planet.

Pursued by the Empire's
sinister agents, Princess
Leia races home aboard her
starship, custodian of the
stolen plans that can save her
people and restore
freedom to the galaxy....`;

  characters: Character[] = [
    { name: 'Luke Skywalker' },
    { name: 'C3-PO' },
    { name: 'R2D2' },
    { name: '...' }
  ];

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

  constructor() {
    this.images[0] = 'https://placehold.co/600x400';
  }

  selectImage(index: number): void {
    this.currentImageIndexSubject.next(index);
  }
}
