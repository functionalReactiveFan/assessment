import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-character',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-character.component.html',
  styleUrls: ['./add-character.component.scss']
})
export class AddCharacterComponent implements OnInit {
  characterForm!: FormGroup;

  eyeColorOptions = [
    { value: 'gelb', label: 'Gelb' },
    { value: 'blau', label: 'Blau' },
    { value: 'grün', label: 'Grün' },
    { value: 'braun', label: 'Braun' },
  ];

  genderOptions = [
    { value: 'männlich', label: 'Männlich' },
    { value: 'weiblich', label: 'Weiblich' },
    { value: 'divers', label: 'Divers' },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.characterForm = this.fb.group({
      name: ['', Validators.required],
      size: [''],
      weight: [''],
      hairColor: [''],
      eyeColor: ['gelb'],
      birthYear: [''],
      gender: ['gelb']
    });
  }

  onSubmit(): void {
    if (this.characterForm.valid) {
      console.log('Form Submitted!', this.characterForm.value);
    }
  }
}
