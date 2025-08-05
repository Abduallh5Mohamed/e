import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SidebarComponent, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild(SidebarComponent) sidebarComponent!: SidebarComponent;

  sidebarCollapsed: boolean = false;
  showDashboardContent: boolean = true;
  isMobile: boolean = false;

  private destroy$ = new Subject<void>();

  constructor(private router: Router) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  ngOnInit() {
    this.checkScreenSize();

    // Listen to router events to determine when to show dashboard content
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe((event: NavigationEnd) => {
        // Show dashboard content only when at the main admin route or dashboard route
        this.showDashboardContent =
          event.url === '/admin' || event.url === '/admin/dashboard';
      });
  }

  private checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
  }

  onSidebarToggle() {
    if (this.isMobile) {
      // On mobile, toggle the mobile sidebar overlay
      if (this.sidebarComponent) {
        this.sidebarComponent.toggleMobileSidebar();
      }
    } else {
      // On desktop, toggle collapse state
      this.sidebarCollapsed = !this.sidebarCollapsed;
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
