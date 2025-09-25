import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Planet } from '../../models/planet.model';
import { PlanetCardComponent } from '../planet-card/planet-card.component';

@Component({
  selector: 'app-planet-list',
  standalone: true,
  imports: [CommonModule, PlanetCardComponent],
  templateUrl: './planet-list.component.html',
  styleUrls: ['./planet-list.component.scss']
})
export class PlanetListComponent {
  @Input() planets: Planet[] | null = [];
}


