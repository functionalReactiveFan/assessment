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
  templateUrl: './planets-page.component.html',
  styleUrls: ['./planets-page.component.scss']
})
export class PlanetsPageComponent implements OnInit {
  planets$!: Observable<Planet[]>;

  constructor(private planetService: PlanetService) {}

  ngOnInit(): void {
    this.planets$ = this.planetService.getPlanets();
  }
}


