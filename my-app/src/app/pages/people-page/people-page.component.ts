import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Person } from '../../models/person.model';
import { PeopleService } from '../../services/people.service';
import { CardComponent } from '../../components/card/card.component';
import { extractPeopleId } from '../../utils/swapi-url';

@Component({
  selector: 'app-people-page',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './people-page.component.html',
  styleUrls: ['./people-page.component.scss']
})
export class PeoplePageComponent implements OnInit {
  people$!: Observable<Person[]>;

  constructor(private peopleService: PeopleService) {}

  ngOnInit(): void {
    this.people$ = this.peopleService.getPeople();
  }

  getPersonDetailHref(p: Person): string {
    const id = extractPeopleId(p.url);
    return id ? `/character-detail/${id}` : '/character-detail/1';
  }
}



