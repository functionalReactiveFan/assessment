import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Planet } from '../../models/planet.model';

@Component({
  selector: 'app-planet-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="planet-card" *ngIf="planet">
      <img [src]="planet.imageUrl" [alt]="planet.imageAlt">
      <div class="card-content">
        <h2>{{ planet.name }}</h2>
        <div class="details">
          <p><strong>Klima:</strong> {{ planet.climate }}</p>
          <p><strong>Gelände:</strong> {{ planet.terrain }}</p>
          <p><strong>Bevölkerung:</strong> {{ planet.population }}</p>
          <p><strong>Durchmesser:</strong> {{ planet.diameterKm }} km</p>
          <p><strong>Schwerkraft:</strong> {{ planet.gravity }}</p>
        </div>
        <a href="#" class="more-info">Mehr Informationen....</a>
      </div>
    </div>
  `,
  styles: [`
    .planet-card { background-color: #fff; display: flex; flex-direction: column; overflow: hidden; }
    .planet-card img { width: 100%; height: auto; display: block; }
    .card-content { background-color: #F4F4F4; padding: 24px; flex-grow: 1; display: flex; flex-direction: column; }
    .card-content h2 { font-size: 1.25rem; font-weight: 700; color: #0A1931; margin-top: 0; margin-bottom: 16px; }
    .details { font-size: 0.9rem; color: #333333; line-height: 1.6; margin-bottom: 24px; flex-grow: 1; }
    .details p { margin: 0 0 4px 0; }
    .details p strong { font-weight: 500; }
    .more-info { font-size: 0.9rem; color: #333333; text-decoration: none; font-weight: 500; }
    .more-info:hover { text-decoration: underline; }
  `]
})
export class PlanetCardComponent {
  @Input() planet!: Planet;
}


