import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-character',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="background-container">
      <div class="background-blur blur-left"></div>
      <div class="background-blur blur-right"></div>
    </div>
    <main class="main-container">
      <div class="form-card">
        <h2 class="form-title">Charakter hinzufügen</h2>
        <form [formGroup]="characterForm" (ngSubmit)="onSubmit()">

          <div class="form-group full-width">
            <label for="name">Name</label>
            <input type="text" id="name" formControlName="name" placeholder="Name eingeben">
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="size">Größe</label>
              <input type="text" id="size" formControlName="size" placeholder="Meter">
            </div>
            <div class="form-group">
              <label for="weight">Gweicht</label>
              <input type="text" id="weight" formControlName="weight" placeholder="Kg">
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="hairColor">Haarfarbe</label>
              <input type="text" id="hairColor" formControlName="hairColor" placeholder="Haarfarbe eingeben">
            </div>
            <div class="form-group">
              <label for="eyeColor">Augenfarbe</label>
              <div class="select-wrapper">
                <select id="eyeColor" formControlName="eyeColor">
                  <option *ngFor="let color of eyeColorOptions" [value]="color.value">{{ color.label }}</option>
                </select>
              </div>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="birthYear">Geburtsjahr</label>
              <input type="text" id="birthYear" formControlName="birthYear" placeholder="YYYY">
            </div>
            <div class="form-group">
              <label for="gender">Geschlecht</label>
              <div class="select-wrapper">
                <select id="gender" formControlName="gender">
                  <option *ngFor="let gender of genderOptions" [value]="gender.value">{{ gender.label }}</option>
                </select>
              </div>
            </div>
          </div>

          <div class="button-group">
            <button type="button" class="btn btn-cancel">Abbrechen</button>
            <button type="submit" class="btn btn-submit">Charakter hinzufügen</button>
          </div>
        </form>
      </div>
    </main>
  `,
  styles: [
    `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

      :host, :host * {
        box-sizing: border-box;
      }

      :host {
        display: block;
        position: relative;
        overflow: hidden;
        min-height: 100vh;
        font-family: 'Inter', sans-serif;
        background-color: #FBFDFE;
        color: #101D2E;
      }

      .background-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        overflow: hidden;
      }

      .background-blur {
        position: absolute;
        filter: blur(120px);
        opacity: 0.6;
      }

      .blur-left {
        width: 400px;
        height: 400px;
        left: 5%;
        top: 20%;
        background: #E0F7FA;
      }

      .blur-right {
        width: 500px;
        height: 500px;
        right: -150px;
        bottom: 5%;
        background: url('https://placehold.co/500x500/FBC02D/FBC02D') no-repeat center center;
        background-size: cover;
      }

      .main-container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        padding: 2rem;
      }

      .form-card {
        background-color: #ffffff;
        padding: 40px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
        width: 100%;
        max-width: 500px;
      }

      .form-title {
        text-align: center;
        font-size: 24px;
        font-weight: 600;
        color: #101D2E;
        margin-bottom: 32px;
      }

      form {
        display: flex;
        flex-direction: column;
        gap: 24px;
      }

      .form-row {
        display: flex;
        gap: 20px;
      }

      .form-group {
        display: flex;
        flex-direction: column;
        flex: 1;
      }

      .full-width {
        width: 100%;
      }

      label {
        font-size: 14px;
        font-weight: 500;
        color: #0D253F;
        margin-bottom: 8px;
      }

      input, select {
        width: 100%;
        padding: 12px 16px;
        border: 1px solid #E0E6EE;
        background-color: #FDFEFF;
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        color: #101D2E;
        transition: border-color 0.2s ease, box-shadow 0.2s ease;
      }

      input::placeholder {
        color: #B0B9C8;
      }

      input:focus, select:focus {
        outline: none;
        border-color: #3B82F6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
      }

      .select-wrapper {
        position: relative;
      }

      .select-wrapper::after {
        content: '\\f0dc'; /* fa-sort */
        font-family: 'Font Awesome 6 Free';
        font-weight: 900;
        position: absolute;
        right: 16px;
        top: 50%;
        transform: translateY(-50%);
        color: #90A4AE;
        pointer-events: none;
      }

      select {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        cursor: pointer;
      }

      .button-group {
        display: flex;
        justify-content: flex-end;
        gap: 12px;
        margin-top: 16px;
      }

      .btn {
        padding: 12px 24px;
        border: none;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: background-color 0.2s ease, transform 0.1s ease;
      }

      .btn:active {
        transform: translateY(1px);
      }

      .btn-cancel {
        background-color: #F1F3F5;
        color: #101D2E;
      }

      .btn-cancel:hover {
        background-color: #E9ECEF;
      }

      .btn-submit {
        background-color: #101D2E;
        color: #FFFFFF;
      }

      .btn-submit:hover {
        background-color: #25374e;
      }

      @media (max-width: 640px) {
        .form-row {
          flex-direction: column;
        }
        .form-card {
          padding: 24px;
        }
        .form-title {
          font-size: 20px;
        }
      }
    `
  ]
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
    { value: 'gelb', label: 'Gelb' },
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
