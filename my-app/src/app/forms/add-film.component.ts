import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-film',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-film.component.html',
  styleUrls: ['./add-film-or-planet.component.scss']
})
export class AddFilmComponent implements OnInit {
  @Output() close = new EventEmitter<void>();

  filmForm!: FormGroup;

  producentOptions = [
    { value: 'lucas', label: 'George Lucas' },
    { value: 'spielberg', label: 'Steven Spielberg' },
    { value: 'besson', label: 'Luc Besson' }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.filmForm = this.fb.group({
      title: [''],
      director: [''],
      releaseDate: [''],
      description: [''],
      producent: ['lucas']
    });
  }

  onSubmit(): void {
    if (this.filmForm.valid) {
      console.log('Form Submitted!', this.filmForm.value);
    }
    this.close.emit();
  }

  onCancel(): void {
    this.close.emit();
  }
}
