import {
  Component,
  EventEmitter,
  Output,
  Input,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ThemeService } from '../../../Services/theme.service';

interface Admin {
  name: string;
  email: string;
  role: string;
  avatar: string;
  status: 'online' | 'away' | 'busy';
}

interface Notification {
  id: number;
  type:
    | 'service'
    | 'completion'
    | 'payment'
    | 'registration'
    | 'system'
    | 'feedback';
  message: string;
  time: string;
  priority: 'high' | 'medium' | 'low';
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() sidebarCollapsed: boolean = false;
  @Output() sidebarToggle = new EventEmitter<void>();

  private destroy$ = new Subject<void>();
  isDarkMode: boolean = false;

  showNotifications = false;
  showAdminDropdown = false;
  notificationCount = 8;
  hasNotifications = true;
  currentAdminIndex = 0;

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    // Subscribe to theme changes
    this.themeService.isDarkMode$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isDark) => {
        this.isDarkMode = isDark;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  admins: Admin[] = [
    {
      name: 'Ahmed Allam',
      email: 'ahmed.allam@d2d.com',
      role: 'Super Admin',
      avatar: '/assets/dashboard-img/avatar.png',
      status: 'online',
    },
    {
      name: 'Sarah Johnson',
      email: 'sarah.johnson@d2d.com',
      role: 'Admin',
      avatar: '/assets/dashboard-img/team-02.png',
      status: 'away',
    },
    {
      name: 'Youssef ElBaz',
      email: 'youssef.elbaz@d2d.com',
      role: 'Manager',
      avatar: '/assets/dashboard-img/team-01.png',
      status: 'busy',
    },
  ];

  notifications: Notification[] = [
    {
      id: 1,
      type: 'service',
      message: 'New brake service request from Ahmed Ali',
      time: '2 minutes ago',
      priority: 'high',
    },
    {
      id: 2,
      type: 'completion',
      message: 'Oil change completed for BMW X5 - Customer: Sara Mohamed',
      time: '15 minutes ago',
      priority: 'medium',
    },
    {
      id: 3,
      type: 'payment',
      message: 'Payment received - 850 EGP for tire replacement',
      time: '1 hour ago',
      priority: 'low',
    },
    {
      id: 4,
      type: 'registration',
      message: 'New customer registered: Omar Khaled',
      time: '2 hours ago',
      priority: 'medium',
    },
    {
      id: 5,
      type: 'system',
      message: 'Daily backup completed successfully',
      time: '3 hours ago',
      priority: 'low',
    },
    {
      id: 6,
      type: 'feedback',
      message: 'Excellent service rating (5 stars) from Mona Hassan',
      time: '4 hours ago',
      priority: 'medium',
    },
    {
      id: 7,
      type: 'service',
      message: 'Engine diagnostic requested for Mercedes C200',
      time: '5 hours ago',
      priority: 'high',
    },
    {
      id: 8,
      type: 'completion',
      message: 'AC repair completed for Hyundai Elantra',
      time: '6 hours ago',
      priority: 'medium',
    },
  ];

  get currentAdmin(): Admin {
    return this.admins[this.currentAdminIndex];
  }

  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
    this.sidebarToggle.emit();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
    this.showAdminDropdown = false;
  }

  toggleAdminDropdown(): void {
    this.showAdminDropdown = !this.showAdminDropdown;
    this.showNotifications = false;
  }

  closeNotifications(): void {
    this.showNotifications = false;
  }

  closeAdminDropdown(): void {
    this.showAdminDropdown = false;
  }

  clearAllNotifications(): void {
    this.notifications = [];
    this.notificationCount = 0;
    this.hasNotifications = false;
  }

  dismissNotification(index: number): void {
    this.notifications.splice(index, 1);
    this.notificationCount = this.notifications.length;
    this.hasNotifications = this.notifications.length > 0;
  }

  switchAdmin(index: number): void {
    if (index !== this.currentAdminIndex) {
      this.currentAdminIndex = index;
      console.log('Switched to admin:', this.currentAdmin.name);

      // Add switching animation
      const profileSelector = document.querySelector(
        '.profile-selector'
      ) as HTMLElement;
      if (profileSelector) {
        profileSelector.style.animation = 'pulse 0.5s ease';
        setTimeout(() => {
          profileSelector.style.animation = '';
        }, 500);
      }

      // Close dropdown after switching
      setTimeout(() => {
        this.showAdminDropdown = false;
      }, 800);
    }
  }

  viewCurrentAdminProfile(): void {
    console.log('Viewing profile for:', this.currentAdmin.name);
    this.showAdminDropdown = false;
    // Add profile viewing logic here
  }

  editProfile(): void {
    console.log('Editing profile...');
    this.showAdminDropdown = false;
    // Add edit profile modal/navigation logic here
  }

  changePassword(): void {
    console.log('Changing password...');
    this.showAdminDropdown = false;
    // Add change password modal/navigation logic here
  }

  viewSettings(): void {
    console.log('Opening settings...');
    this.showAdminDropdown = false;
    // Add settings modal/navigation logic here
  }

  logout(): void {
    console.log('Logging out...');

    // Add logout animation
    const headerElement = document.querySelector(
      '.professional-header'
    ) as HTMLElement;
    if (headerElement) {
      headerElement.style.animation = 'fadeOut 0.5s ease';
    }

    // Simulate logout process
    setTimeout(() => {
      // Add actual logout logic here (clear tokens, redirect, etc.)
      console.log('User logged out successfully');
    }, 500);

    this.showAdminDropdown = false;
  }
}
