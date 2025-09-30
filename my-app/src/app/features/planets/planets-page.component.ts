import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Planet } from '../../models/planet.model';
import { ApisService } from '../../services/apis.service';
import { extractId, PLANETS_ID_REGEX } from '../../utils/swapi-url';

@Component({
  selector: 'app-planets-page',
  templateUrl: './planets-page.component.html',
  styleUrls: ['./planets-page.component.scss']
})
export class PlanetsPageComponent implements OnInit {
  planets$!: Observable<Planet[]>;

  constructor(private apis: ApisService) {}

  ngOnInit(): void {
    this.planets$ = this.apis.getPlanets();
  }

  getPlanetDetailHref(p: Planet): string {
    const id = extractId(p.url, PLANETS_ID_REGEX);
    return id ? `/planets/${id}` : '/planets/1';
  }
}
