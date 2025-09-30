import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Planet } from '../../models/planet.model';
import { ApisService } from '../../services/apis.service';
import { CardComponent } from '../../components/card/card.component';
import {extractId, PLANETS_ID_REGEX} from "../../utils/swapi-url";

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
    return id ? `/planet-detail/${id}` : '/planet-detail/1';
  }
}


