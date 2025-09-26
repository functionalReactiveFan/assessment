import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { GeneralDetailsComponent } from '../general-details/general-details.component';
import { Planet } from '../../models/planet.model';

@Component({
  selector: 'app-planet-details',
  standalone: true,
  imports: [CommonModule, GeneralDetailsComponent],
  templateUrl: './planet-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlanetDetailsComponent {
  private planetSubject = new BehaviorSubject<Planet>({
    name: 'Tatooine',
    climate: 'arid',
    terrain: 'desert',
    population: '200,000',
    diameterKm: '10,465',
    gravity: '1 standard',
    imageUrl: 'https://placehold.co/500x350/20232A/FFFFFF?text=Planet',
    imageAlt: 'Tatooine'
  });

  planet$: Observable<Planet> = this.planetSubject.asObservable();
}
