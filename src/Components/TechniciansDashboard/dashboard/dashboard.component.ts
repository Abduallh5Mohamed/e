import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-technicians-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class TechniciansDashboardComponent {
  profile = {
    name: 'Mike Johnson',
    rating: 4.9,
    totalJobs: 340,
    earningsToday: 245,
    earningsWeek: 1680,
    earningsMonth: 6420
  };

  activeTab = 'Dashboard';
  availability = 'Available';

jobsToday = [
  { title: 'Oil Change & Filter', status: 'Accepted', time: '10:00 AM', customer: 'Sarah Wilson', distance: '2.3 km', price: 65 },
  { title: 'Brake Inspection', status: 'Pending', time: '2:00 PM', customer: 'John Davis', distance: '4.1 km', price: 85 },
  { title: 'Tire Replacement', status: 'Accepted', time: '4:00 PM', customer: 'Emma Brown', distance: '3.2 km', price: 120 },
  { title: 'Engine Diagnostic', status: 'Pending', time: '6:30 PM', customer: 'Michael Lee', distance: '5.0 km', price: 150 }
];


  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}