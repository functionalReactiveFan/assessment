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
  selector: 'app-film-details',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.scss']
})
export class FilmDetailsComponent {
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
