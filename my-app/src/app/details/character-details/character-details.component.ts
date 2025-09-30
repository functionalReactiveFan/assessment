import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Person } from "../../models/person.model";
import { ActivatedRoute } from '@angular/router';
import { ApisService } from '../../services/apis.service';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterDetailsComponent {
  person$: Observable<Person>;

  constructor(
    private route: ActivatedRoute,
    private apis: ApisService) {

    this.person$ = this.route.paramMap.pipe(
      map(params => params.get('id')),
      switchMap((id) => this.apis.getPersonById(id || '1'))
    );
  }
}
