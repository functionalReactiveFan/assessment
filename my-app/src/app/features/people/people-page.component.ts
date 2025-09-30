import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from '../../models/person.model';
import { ApisService } from '../../services/apis.service';
import { extractId, PEOPLE_ID_REGEX } from '../../utils/helpers';

@Component({
  selector: 'app-people-page',
  templateUrl: './people-page.component.html',
  styleUrls: ['./people-page.component.scss']
})
export class PeoplePageComponent implements OnInit {
  people$!: Observable<Person[]>;

  constructor(private apis: ApisService) {}

  ngOnInit(): void {
    this.people$ = this.apis.getPeople();
  }

  getPersonDetailHref(p: Person): string {
    const id = extractId(p.url, PEOPLE_ID_REGEX);
    return id ? `/people/${id}` : '/people/1';
  }
}
