import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Planet } from '../../models/planet.model';
import { ApisService } from '../../services/apis.service';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-planets-page',
  standalone: true,
  imports: [CommonModule, CardComponent],
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
    const id = this.extractIdFromUrl(p.url);
    return id ? `/planet-detail/${id}` : '/planet-detail/1';
  }

  private extractIdFromUrl(url: string): string | null {
    if (!url) return null;
    const match = url.match(/planets\/(\d+)\/?$/);
    return match ? match[1] : null;
  }
}


