import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Planet } from '../../models/planet.model';
import { PlanetService } from '../../services/planet.service';
import { PlanetListComponent } from '../../components/planet-list/planet-list.component';

@Component({
  selector: 'app-planets-page',
  standalone: true,
  imports: [CommonModule, PlanetListComponent],
  template: `
    <div class="container planets-page-container">
      <h1 class="page-title">Planeten</h1>
      <app-planet-list [planets]="planets$ | async"></app-planet-list>
    </div>
  `,
  styles: [`
    .planets-page-container { padding-top: 64px; padding-bottom: 64px; }
    .page-title { font-size: 3.5rem; font-weight: 700; color: #0A1931; text-align: center; margin-top: 0; margin-bottom: 64px; }
    @media (max-width: 768px) {
      .page-title { font-size: 2.5rem; margin-bottom: 48px; }
      .planets-page-container { padding-top: 48px; padding-bottom: 48px; }
    }
  `]
})
export class PlanetsPageComponent implements OnInit {
  planets$!: Observable<Planet[]>;

  constructor(private planetService: PlanetService) {}

  ngOnInit(): void {
    this.planets$ = this.planetService.getPlanets();
  }
}


