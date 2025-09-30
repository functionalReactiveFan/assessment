import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Planet } from '../../models/planet.model';

import { ActivatedRoute } from '@angular/router';
import {map, switchMap} from 'rxjs/operators';
import { ApisService } from '../../services/apis.service';

@Component({
  selector: 'app-planet-details',
  templateUrl: './planet-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlanetDetailsComponent {
  planet$: Observable<Planet>;

  constructor(private route: ActivatedRoute, private apis: ApisService) {
    this.planet$ = this.route.paramMap.pipe(
      map(params => params.get('id')),
      switchMap((id) => this.apis.getPlanetById(id || '1'))
    );
  }
}
