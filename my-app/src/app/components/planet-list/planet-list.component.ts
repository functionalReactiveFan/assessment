import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Planet } from '../../models/planet.model';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-planet-list',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './planet-list.component.html',
  styleUrls: ['./planet-list.component.scss']
})
export class PlanetListComponent {
  @Input() planets: Planet[] | null = [];
}


