import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehiclesComponent } from '../vehicles/vehicles.component';
import { ServiceHistoryComponent } from '../service-history/service-history.component';

interface UpcomingService {
  day: string;
  month: string;
  title: string;
  description: string;
  vehicle: string;
  time: string;
  status: string;
  statusText: string;
}

interface RecentActivity {
  icon: string;
  title: string;
  description: string;
  time: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, VehiclesComponent, ServiceHistoryComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  activeTab: string = 'dashboard';

  // Sample data for upcoming services
  upcomingServices: UpcomingService[] = [
    {
      day: '15',
      month: 'Aug',
      title: 'Oil Change Service',
      description: 'Regular maintenance oil change',
      vehicle: 'Toyota Camry 2020',
      time: '10:00 AM',
      status: 'confirmed',
      statusText: 'Confirmed',
    },
    {
      day: '20',
      month: 'Aug',
      title: 'Brake Inspection',
      description: 'Comprehensive brake system check',
      vehicle: 'Honda Civic 2019',
      time: '2:00 PM',
      status: 'pending',
      statusText: 'Pending',
    },
    {
      day: '25',
      month: 'Aug',
      title: 'Tire Replacement',
      description: 'Replace front tires',
      vehicle: 'Toyota Camry 2020',
      time: '11:30 AM',
      status: 'confirmed',
      statusText: 'Confirmed',
    },
  ];

  // Sample data for recent activities
  recentActivities: RecentActivity[] = [
    {
      icon: 'fas fa-check-circle',
      title: 'Service Completed',
      description: 'Engine diagnostic completed successfully',
      time: '2 hours ago',
    },
    {
      icon: 'fas fa-calendar-plus',
      title: 'Service Scheduled',
      description: 'Oil change scheduled for August 15th',
      time: '1 day ago',
    },
    {
      icon: 'fas fa-car',
      title: 'Vehicle Added',
      description: 'Honda Civic 2019 added to your garage',
      time: '3 days ago',
    },
    {
      icon: 'fas fa-user-check',
      title: 'Profile Updated',
      description: 'Contact information updated',
      time: '1 week ago',
    },
  ];

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
}
