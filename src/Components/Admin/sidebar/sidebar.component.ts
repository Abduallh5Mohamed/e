import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  route: string;
  badge?: number;
  submenu?: MenuItem[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  @Input() collapsed = false;

  isMobile = false;
  mobileOpen = false;

  private destroy$ = new Subject<void>();

  constructor(private router: Router) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  ngOnInit() {
    this.checkScreenSize();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
    if (!this.isMobile) {
      this.mobileOpen = false;
    }
  }

  toggleMobileSidebar() {
    if (this.isMobile) {
      this.mobileOpen = !this.mobileOpen;
    }
  }

  closeMobileSidebar() {
    if (this.isMobile) {
      this.mobileOpen = false;
    }
  }

  menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'fas fa-tachometer-alt',
      route: '/admin/dashboard',
      badge: 0,
    },
    {
      id: 'customers',
      label: 'Customers',
      icon: 'fas fa-users',
      route: '/admin/customers',
      badge: 125,
    },
    {
      id: 'drivers',
      label: 'Drivers',
      icon: 'fas fa-id-card',
      route: '/admin/drivers',
      badge: 45,
    },
    {
      id: 'technicians',
      label: 'Technicians',
      icon: 'fas fa-user-cog',
      route: '/admin/technicians',
      badge: 12,
    },
    {
      id: 'orders',
      label: 'Orders',
      icon: 'fas fa-clipboard-list',
      route: '/admin/orders',
      badge: 23,
    },
    {
      id: 'stock',
      label: 'Stock',
      icon: 'fas fa-boxes',
      route: '/admin/stock',
      badge: 8,
    },
    {
      id: 'financial',
      label: 'Financial',
      icon: 'fas fa-chart-line',
      route: '/admin/financial',
      badge: 0,
    },
  ];

  quickActions = [
    {
      label: 'New Order',
      icon: 'fas fa-plus-circle',
      action: 'newOrder',
      color: '#10b981',
    },
    {
      label: 'Add Customer',
      icon: 'fas fa-user-plus',
      action: 'addCustomer',
      color: '#3b82f6',
    },
    {
      label: 'Reports',
      icon: 'fas fa-chart-bar',
      action: 'reports',
      color: '#f59e0b',
    },
  ];

  handleQuickAction(action: string): void {
    this.closeMobileSidebar(); // Close sidebar when navigating on mobile

    switch (action) {
      case 'newOrder':
        this.router.navigate(['/admin/orders']);
        break;
      case 'addCustomer':
        this.router.navigate(['/admin/customers']);
        break;
      case 'reports':
        this.router.navigate(['/admin/financial']);
        break;
    }
  }

  onMenuItemClick() {
    this.closeMobileSidebar(); // Close sidebar when menu item is clicked on mobile
  }

  logout(): void {
    // Simple logout without any alerts
    console.log('User signed out');
    // You can add additional logout logic here like clearing user data
  }
}
