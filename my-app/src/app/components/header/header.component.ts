import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="app-header">
      <div class="container header-container">
        <div class="logo-nav">
          <div class="logo">
            <svg width="100" height="42" viewBox="0 0 234 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0H33.8L38.8 12.5H68.8L73.8 0H100L80 50L100 100H73.8L68.8 87.5H38.8L33.8 100H0L20 50L0 0ZM41.3 25L31.3 50L41.3 75H66.3L76.3 50L66.3 25H41.3Z" fill="currentColor"/>
              <path d="M112.5 0V100H137.5V62.5H165V100H190V0H165V37.5H137.5V0H112.5Z" fill="currentColor"/>
              <path d="M202.5 0L195 100H221.3L223.8 81.3H233.8L226.3 0H202.5ZM225 62.5L227.5 43.8L228.8 31.3L230 25H227.5L220 62.5H225Z" fill="currentColor"/>
            </svg>
          </div>
          <nav>
            <ul>
              <li><a href="#">Star Wars</a></li>
              <li><a href="#" class="active">Filme</a></li>
              <li><a href="#">Charaktere</a></li>
              <li><a href="#">Planeten</a></li>
            </ul>
          </nav>
        </div>
        <div class="search-container">
          <input type="text" placeholder="Suche">
          <i class="fas fa-search search-icon"></i>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .app-header {
      background-color: #fff;
      border-bottom: 1px solid #e0e0e0;
      padding: 16px 0;
      color: #0A1931;
    }
    .header-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .logo-nav {
      display: flex;
      align-items: center;
    }
    .logo {
      margin-right: 48px;
    }
    nav ul {
      margin: 0;
      padding: 0;
      list-style: none;
      display: flex;
      gap: 32px;
    }
    nav ul li a {
      text-decoration: none;
      color: #0A1931;
      font-size: 16px;
      font-weight: 500;
      padding-bottom: 8px;
      position: relative;
    }
    nav ul li a.active {
      border-bottom: 2px solid #0A1931;
    }
    .search-container {
      position: relative;
    }
    .search-container input {
      border: 1px solid #CED4DA;
      border-radius: 4px;
      padding: 8px 32px 8px 12px;
      font-size: 16px;
      width: 200px;
      outline: none;
    }
    .search-container input::placeholder {
      color: #ADB5BD;
    }
    .search-icon {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      color: #ADB5BD;
    }

    @media (max-width: 992px) {
      .logo-nav nav {
        display: none;
      }
    }
     @media (max-width: 576px) {
      .search-container {
        display: none;
      }
      .header-container {
        justify-content: center;
      }
    }
  `]
})
export class HeaderComponent { }