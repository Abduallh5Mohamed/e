import { Component } from '@angular/core';
import { ServicesComponent } from '../Components/Landing/services/services.component';
import { NavbarComponent } from '../Components/Landing/navbar/navbar.component';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { TechniciansComponent } from '../Components/Landing/technicians/technicians.component';
import { FooterComponent } from '../Components/Landing/footer/footer.component';
import { HomeComponent } from '../Components/Landing/home/home.component';
import { FeedbackComponent } from '../Components/Landing/feedback/feedback.component';
import { AboutComponent } from '../Components/Landing/about/about.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ServicesComponent,
    NavbarComponent,
    TechniciansComponent,
    FeedbackComponent,
    FooterComponent,
    AboutComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'D2D Car';
  public isHomePage = false;
  public isDashboardPage = false;
  public isAdminPage = false;

  constructor(public router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isHomePage =
          event.urlAfterRedirects === '/' ||
          event.urlAfterRedirects === '/home';
        this.isDashboardPage =
          event.urlAfterRedirects.includes('/dashboard') ||
          event.urlAfterRedirects.includes('/admin');
        this.isAdminPage = event.urlAfterRedirects.includes('/admin');

        // Add/remove admin-page class to body
        if (this.isAdminPage) {
          document.body.classList.add('admin-page');
        } else {
          document.body.classList.remove('admin-page');
        }
      });
  }

  goToAdminDashboard(): void {
    if (this.isAdminPage) {
      // If currently on admin page, go back to website home
      this.router.navigate(['/home']);
    } else {
      // If not on admin page, go to admin dashboard
      this.router.navigate(['/admin']);
    }
  }
}
