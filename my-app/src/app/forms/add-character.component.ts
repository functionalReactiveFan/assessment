import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-character',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-character.component.html',
  styleUrls: ['./add-character.component.scss']
})
export class AddCharacterComponent implements OnInit {
  @Output() close = new EventEmitter<void>();

  characterForm!: FormGroup;

  eyeColorOptions = [
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
      name: [''],
      size: [''],
      weight: [''],
      hairColor: [''],
      eyeColor: ['blau'],
      birthYear: [''],
      gender: ['weiblich']
    });
  }

  onSubmit(): void {
    if (this.characterForm.valid) {
      console.log('Form Submitted!', this.characterForm.value);
    }
    this.close.emit();
  }

  onCancel(): void {
    this.close.emit();
  }
}
