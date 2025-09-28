import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-film',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-film.component.html',
  styleUrls: ['./add-film.component.scss']
})
export class AddFilmComponent implements OnInit {
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
  }
}
