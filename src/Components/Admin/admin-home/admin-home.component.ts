import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="admin-home">
      <!-- Content removed - add new sections here -->
    </div>
  `,
  styles: [
    `
      .admin-home {
        padding: 20px;
        min-height: 100vh;
        background: var(--bg-primary, white);
        color: var(--text-primary, #333);
      }
    `,
  ],
})
export class AdminHomeComponent {}
