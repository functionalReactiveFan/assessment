import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-planet',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-planet.component.html',
  styleUrls: ['./add-film-or-planet.component.scss']
})
export class AddPlanetComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  planetForm!: FormGroup;

  typeOptions = [
    { value: 'desert', label: 'Desert planet' },
    { value: 'gas', label: 'Gas planet' }
  ];

  createdByOptions = [
    { value: 'lucas', label: 'George Lucas' },
    { value: 'besson', label: 'Luc Besson' }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.planetForm = this.fb.group({
      name: [''],
      type: ['desert'],
      createdBy: ['lucas'],
      genre: [''],
      races: ['']
    });
  }

  onSubmit(): void {
    if (this.planetForm.valid) {
      console.log('Form Submitted!', this.planetForm.value);
    }
    this.close.emit();
  }

  onCancel(): void {
    this.close.emit();
  }
}
