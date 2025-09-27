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
  characterForm!: FormGroup;

  producentOptions = [
    { value: 'lucas', label: 'George Lucas' },
    { value: 'spielberg', label: 'Steven Spielberg' },
    { value: 'besson', label: 'Luc Besson' }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.characterForm = this.fb.group({
      title: ['', Validators.required],
      director: ['', Validators.required],
      releaseDate: [''],
      description: [''],
      producent: ['lucas']
    });
  }

  onSubmit(): void {
    if (this.characterForm.valid) {
      console.log('Form Submitted!', this.characterForm.value);
    }
  }
}
