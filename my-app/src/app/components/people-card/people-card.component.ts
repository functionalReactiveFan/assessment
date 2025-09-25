import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Person } from '../../models/person.model';

@Component({
  selector: 'app-people-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="people-card" *ngIf="person">
      <img [src]="person.imageUrl" [alt]="person.imageAlt">
      <div class="card-content">
        <h2>{{ person.name }}</h2>
        <div class="details">
          <p><strong>Geschlecht:</strong> {{ person.gender }}</p>
          <p><strong>Geburtsjahr:</strong> {{ person.birthYear }}</p>
          <p><strong>Größe:</strong> {{ person.heightCm }} cm</p>
          <p><strong>Masse:</strong> {{ person.massKg }} kg</p>
        </div>
        <a href="#" class="more-info">Mehr Informationen....</a>
      </div>
    </div>
  `,
  styles: [`
    .people-card { background-color: #fff; display: flex; flex-direction: column; overflow: hidden; }
    .people-card img { width: 100%; height: auto; display: block; }
    .card-content { background-color: #F4F4F4; padding: 24px; flex-grow: 1; display: flex; flex-direction: column; }
    .card-content h2 { font-size: 1.25rem; font-weight: 700; color: #0A1931; margin-top: 0; margin-bottom: 16px; }
    .details { font-size: 0.9rem; color: #333333; line-height: 1.6; margin-bottom: 24px; flex-grow: 1; }
    .details p { margin: 0 0 4px 0; }
    .details p strong { font-weight: 500; }
    .more-info { font-size: 0.9rem; color: #333333; text-decoration: none; font-weight: 500; }
    .more-info:hover { text-decoration: underline; }
  `]
})
export class PeopleCardComponent {
  @Input() person!: Person;
}


