import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { GeneralDetailsComponent } from '../general-details/general-details.component';
import { Planet } from '../../models/planet.model';

import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { PlanetService } from '../../services/planet.service';

@Component({
  selector: 'app-planet-details',
  standalone: true,
  imports: [CommonModule, GeneralDetailsComponent],
  templateUrl: './planet-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlanetDetailsComponent {
  planet$: Observable<Planet>;

  constructor(private route: ActivatedRoute, private planetService: PlanetService) {
    this.planet$ = this.route.paramMap.pipe(
      map(params => params.get('id')),
      switchMap((id) => this.planetService.getPlanetById(id || '1')),
      map((p: any) => this.mapSwapiPlanetToPlanet(p))
    );
  }

  private mapSwapiPlanetToPlanet(p: any): Planet {
    const name = typeof p?.name === 'string' ? p.name : 'Unknown';
    return {
      name,
      climate: p?.climate ?? 'Unknown',
      terrain: p?.terrain ?? 'Unknown',
      population: p?.population ?? 'Unknown',
      diameterKm: p?.diameter ?? 'Unknown',
      gravity: p?.gravity ?? 'Unknown',
      films: Array.isArray(p?.films) ? p.films : [],
      imageUrl: `https://placehold.co/500x350/20232A/FFFFFF?text=${encodeURIComponent(name)}`,
      imageAlt: name,
      url: p?.url ?? ''
    };
  }
}
