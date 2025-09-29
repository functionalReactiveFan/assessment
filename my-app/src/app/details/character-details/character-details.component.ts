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
      map((p: any) => this.mapSwapiPersonToCharacter(p))
    );
  }

  private mapSwapiPersonToCharacter(p: any): Character {
    const name = typeof p?.name === 'string' ? p.name : 'Unknown';
    return {
      name,
      details: {
        height: p?.height ? `${p.height}cm` : 'Unknown',
        weight: p?.mass ? `${p.mass}kg` : 'Unknown',
        hair_color: p?.hair_color ?? 'Unknown',
        eye_color: p?.eye_color ?? 'Unknown',
        birth_year: p?.birth_year ?? 'Unknown',
        gender: p?.gender ?? 'Unknown',
      },
      homeworld: p?.homeworld ?? 'Unknown',
      films: Array.isArray(p?.films) ? p.films : [],
      imageUrl: `https://placehold.co/500x350/20232A/FFFFFF?text=${encodeURIComponent(name)}`,
    };
  }
}
