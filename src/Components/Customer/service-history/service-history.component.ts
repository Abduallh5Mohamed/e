import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ServiceHistory {
  id: number;
  title: string;
  status: string;
  price: number;
  rating: number;
  date: string;
  technician: string;
  vehicle: string;
  location: string;
  duration: string;
  serviceType: string;
}

@Component({
  selector: 'app-service-history',
  imports: [CommonModule, FormsModule],
  templateUrl: './service-history.component.html',
  styleUrl: './service-history.component.css',
})
export class ServiceHistoryComponent {
  serviceHistory: ServiceHistory[] = [
    {
      id: 1,
      title: 'Oil Change & Filter',
      status: 'Completed',
      price: 65,
      rating: 5,
      date: 'January 5, 2024',
      technician: 'Mike Johnson',
      vehicle: 'Toyota Camry',
      location: 'Downtown Branch',
      duration: '45 mins',
      serviceType: 'Premium Service',
    },
    {
      id: 2,
      title: 'Brake Service',
      status: 'Completed',
      price: 185,
      rating: 5,
      date: 'December 15, 2023',
      technician: 'Ahmed Hassan',
      vehicle: 'Honda CR-V',
      location: 'Mall Branch',
      duration: '2 hours',
      serviceType: 'Full Brake Replacement',
    },
    {
      id: 3,
      title: 'Tire Replacement',
      status: 'Completed',
      price: 320,
      rating: 4,
      date: 'November 28, 2023',
      technician: 'Omar Khaled',
      vehicle: 'Toyota Camry',
      location: 'Airport Branch',
      duration: '1.5 hours',
      serviceType: 'All-Season Tires',
    },
    {
      id: 4,
      title: 'Engine Diagnostic',
      status: 'Completed',
      price: 150,
      rating: 4,
      date: 'October 22, 2023',
      technician: 'Sarah Wilson',
      vehicle: 'Honda CR-V',
      location: 'City Center Branch',
      duration: '1 hour',
      serviceType: 'Computer Diagnostic',
    },
    {
      id: 5,
      title: 'AC Service',
      status: 'Completed',
      price: 120,
      rating: 5,
      date: 'September 10, 2023',
      technician: 'Mohamed Ali',
      vehicle: 'Toyota Camry',
      location: 'Downtown Branch',
      duration: '90 mins',
      serviceType: 'AC Repair & Recharge',
    },
  ];

  // Modal state
  showAddServiceModal: boolean = false;

  // New service object
  newService: ServiceHistory = {
    id: 0,
    title: '',
    status: 'Completed',
    price: 0,
    rating: 5,
    date: '',
    technician: '',
    vehicle: '',
    location: 'Main Branch',
    duration: '60 mins',
    serviceType: 'General Service',
  };

  // Modal methods
  openAddServiceModal(): void {
    this.showAddServiceModal = true;
    this.resetNewService();
  }

  closeAddServiceModal(): void {
    this.showAddServiceModal = false;
    this.resetNewService();
  }

  resetNewService(): void {
    this.newService = {
      id: 0,
      title: '',
      status: 'Completed',
      price: 0,
      rating: 5,
      date: '',
      technician: '',
      vehicle: '',
      location: 'Main Branch',
      duration: '60 mins',
      serviceType: 'General Service',
    };
  }

  addNewService(): void {
    // Generate new ID
    const newId = Math.max(...this.serviceHistory.map((s) => s.id)) + 1;

    // Set the new service properties
    this.newService.id = newId;

    // Format date to readable format
    if (this.newService.date) {
      const date = new Date(this.newService.date);
      this.newService.date = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }

    // Add to the beginning of the array (most recent first)
    this.serviceHistory.unshift({ ...this.newService });

    // Close modal and reset form
    this.closeAddServiceModal();
  }

  // Helper method to generate star array for rating
  getStarArray(rating: number): boolean[] {
    return Array(5)
      .fill(false)
      .map((_, index) => index < rating);
  }

  // TrackBy function for performance optimization
  trackByServiceId(index: number, service: ServiceHistory): number {
    return service.id;
  }
}
