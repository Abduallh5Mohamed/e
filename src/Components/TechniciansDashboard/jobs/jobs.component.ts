import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-jobs',
  imports: [CommonModule, FormsModule],
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css'],
})
export class JobsComponent implements OnInit {
  userName: string = 'John Doe';
  userRate: number = 4.8;
  reviewCount: number = 1250;
  jobsCompleted: number = 24;
  dailyRevenue: number = 150;
  weeklyRevenue: number = 1250;
  isAvailable: boolean = true;

  jobs: any[] = [
    {
      id: 1,
      title: 'Oil Change & Filter',
      status: 'Accepted',
      customerName: 'Emma Johnson',
      carModel: '2021 Honda Civic',
      time: '09:30 AM',
      distance: '1.8 km',
      price: 60,
      date: '2024-01-15',
    },
    {
      id: 2,
      title: 'Brake Inspection',
      status: 'Pending',
      customerName: 'Michael Smith',
      carModel: '2020 Ford Explorer',
      time: '01:00 PM',
      distance: '3.5 km',
      price: 85,
      date: '2024-01-16',
    },
    {
      id: 3,
      title: 'Tire Replacement',
      status: 'Accepted',
      customerName: 'Sophia Williams',
      carModel: '2019 BMW X5',
      time: '11:15 AM',
      distance: '5.2 km',
      price: 120,
      date: '2024-01-17',
    },
  ];

  performanceData = {
    jobsCompleted: 50,
    averageRate: 4.9,
    responseTime: '30 min',
    completionRate: '95%',
  };

  topServices = [
    { service: 'Brake Repair', price: '$150', count: 12 },
    { service: 'Engine Tune-up', price: '$200', count: 8 },
    { service: 'Oil Change', price: '$50', count: 20 },
  ];

  specialties: string[] = ['Brake Systems', 'Engine Repair', 'Tire Services'];
  newSpecialty: string = '';

  constructor() {}

  ngOnInit(): void {}

  addSpecialty() {
    if (this.newSpecialty.trim() !== '') {
      this.specialties.push(this.newSpecialty.trim());
      this.newSpecialty = '';
    }
  }

  removeSpecialty(specialty: string) {
    this.specialties = this.specialties.filter((s) => s !== specialty);
  }

  // Job action methods
  viewJobDetails(job: any) {
    console.log('Viewing details for job:', job);
    // Add navigation logic here
  }

  callCustomer(job: any) {
    console.log('Calling customer:', job.customerName);
    // Add phone call logic here
    if (confirm(`Call ${job.customerName}?`)) {
      window.open(`tel:+1234567890`, '_self');
    }
  }

  getDirections(job: any) {
    console.log('Getting directions for job:', job);
    // Add maps/directions logic here
    window.open(
      `https://maps.google.com/maps?q=${job.customerName}+location`,
      '_blank'
    );
  }

  // Job status management
  acceptJob(job: any) {
    job.status = 'Accepted';
    console.log('Job accepted:', job);
  }

  rejectJob(job: any) {
    if (confirm('Are you sure you want to reject this job?')) {
      job.status = 'Rejected';
      console.log('Job rejected:', job);
    }
  }

  completeJob(job: any) {
    if (confirm('Mark this job as completed?')) {
      job.status = 'Completed';
      this.jobsCompleted++;
      console.log('Job completed:', job);
    }
  }

  // Filter functionality
  selectedStatus: string = 'all-status';
  selectedService: string = 'all-services';

  get filteredJobs() {
    return this.jobs.filter((job) => {
      const statusMatch =
        this.selectedStatus === 'all-status' ||
        job.status.toLowerCase() === this.selectedStatus.toLowerCase();
      const serviceMatch =
        this.selectedService === 'all-services' ||
        job.title.toLowerCase().includes(this.selectedService.toLowerCase());
      return statusMatch && serviceMatch;
    });
  }

  onStatusFilterChange(event: any) {
    this.selectedStatus = event.target.value;
  }

  onServiceFilterChange(event: any) {
    this.selectedService = event.target.value;
  }

  // Toggle availability
  toggleAvailability() {
    this.isAvailable = !this.isAvailable;
    console.log(
      'Availability toggled:',
      this.isAvailable ? 'Available' : 'Unavailable'
    );
  }
}
