import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Person } from '../../models/person.model';
import { PeopleService } from '../../services/people.service';
import { PeopleListComponent } from '../../components/people-list/people-list.component';

@Component({
  selector: 'app-people-page',
  standalone: true,
  imports: [CommonModule, PeopleListComponent],
  templateUrl: './people-page.component.html',
  styleUrls: ['./people-page.component.scss']
})
export class PeoplePageComponent implements OnInit {
  people$!: Observable<Person[]>;

  constructor(private peopleService: PeopleService) {}

  ngOnInit(): void {
    this.people$ = this.peopleService.getPeople();
  }
}



