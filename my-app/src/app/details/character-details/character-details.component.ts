import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Character } from "../../models/character.model";
import { DetailsComponent } from "../../components/details/details.component";
import { ActivatedRoute } from '@angular/router';
import { ApisService } from '../../services/apis.service';

@Component({
  selector: 'app-character-details',
  standalone: true,
  imports: [CommonModule, DetailsComponent],
  templateUrl: './character-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterDetailsComponent {
  character$: Observable<Character>;

  constructor(
    private route: ActivatedRoute,
    private apis: ApisService) {

    this.character$ = this.route.paramMap.pipe(
      map(params => params.get('id')),
      switchMap((id) => this.apis.getPersonById(id || '1')),
      map((p: any) => this.mapCharacter(p))
    );
  }

  private mapCharacter(p: any): Character {
    const name= p?.name ?? '';
    return {
      name,
      details: {
        height: p?.height ? `${p.height}cm` : '',
        weight: p?.mass ? `${p.mass}kg` : '',
        hair_color: p?.hair_color ?? '',
        eye_color: p?.eye_color ?? '',
        birth_year: p?.birth_year ?? '',
        gender: p?.gender ?? '',
      },
      homeworld: p?.homeworld ?? '',
      films: Array.isArray(p?.films) ? p.films : [],
      planets: Array.isArray(p?.planets) ? p.planets : [],
      starships: Array.isArray(p?.starships) ? p.starships : [],
      vehicles: Array.isArray(p?.vehicles) ? p.vehicles : [],
      imageUrl: `https://placehold.co/500x350/20232A/FFFFFF?text=${encodeURIComponent(name)}`,
    };
  }
}
