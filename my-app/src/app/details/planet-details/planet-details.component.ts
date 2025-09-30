import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { DetailsComponent } from '../../components/details/details.component';
import { Planet } from '../../models/planet.model';

import { ActivatedRoute } from '@angular/router';
import {map, switchMap} from 'rxjs/operators';
import { ApisService } from '../../services/apis.service';

@Component({
  selector: 'app-planet-details',
  standalone: true,
  imports: [CommonModule, DetailsComponent],
  templateUrl: './planet-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlanetDetailsComponent {
  planet$: Observable<Planet>;

  constructor(private route: ActivatedRoute, private apis: ApisService) {
    this.planet$ = this.route.paramMap.pipe(
      map(params => params.get('id')),
      switchMap((id) => this.apis.getPlanetById(id || '1')),
      map((p: any) => this.mapPlanet(p))
    );
  }

  private mapPlanet(p: any): Planet {
    const name= p?.name ?? '';
    console.log('p?.residents', p?.residents)
    return {
      name,
      climate: p?.climate ?? '',
      terrain: p?.terrain ?? '',
      population: p?.population ?? '',
      diameterKm: p?.diameter ?? '',
      gravity: p?.gravity ?? '',
      films: Array.isArray(p?.films) ? p.films : [],
      people: Array.isArray(p?.residents) ? p.residents : [],
      starships: Array.isArray(p?.starships) ? p.starships : [],
      vehicles: Array.isArray(p?.vehicles) ? p.vehicles : [],
      imageUrl: `https://placehold.co/500x350/20232A/FFFFFF?text=${encodeURIComponent(name)}`,
      imageAlt: name,
      url: p?.url ?? ''
    };
  }
}
