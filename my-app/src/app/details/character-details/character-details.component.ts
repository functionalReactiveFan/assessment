import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { Character } from "../../models/character.model";
import { GeneralDetailsComponent } from "../general-details/general-details.component";

@Component({
  selector: 'app-character-details',
  standalone: true,
  imports: [CommonModule, GeneralDetailsComponent],
  templateUrl: './character-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterDetailsComponent {
  private characterSubject = new BehaviorSubject<Character>({
    name: 'Luke Skywalker',
    details: {
      height: '1,72m',
      weight: '77kg',
      hair_color: 'blond',
      eye_color: 'blau',
      birth_year: '19BBY',
      gender: 'männlich',
    },
    homeworld: 'Tatooine',
    films: ['Film 1', 'Film 1', 'Film 1', 'Film 1'],
    imageUrl: 'https://placehold.co/500x350/20232A/FFFFFF?text=Image',
  });

  character$: Observable<Character> = this.characterSubject.asObservable();
}
