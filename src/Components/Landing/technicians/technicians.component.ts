import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-technicians',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './technicians.component.html',
  styleUrls: ['./technicians.component.css']
})
export class TechniciansComponent {
  technicians = [
    {
      name: 'John Doe',
      experience: 7,
      service: 'Brake Repair',
      rating: 4,
      image: 'assets/technicians-img/tech1.jpg'
    },
    {
      name: 'Karl Lee',
      experience: 10,
      service: 'Transmission Fixing',
      rating: 5,
      image: 'assets/technicians-img/tech2.jpg'
    },
    {
      name: 'Mike Ross',
      experience: 5,
      service: 'Suspension & Alignment',
      rating: 3,
      image: 'assets/technicians-img/tech3.jpg'
    },
    {
      name: 'Ethan Brown',
      experience: 8,
      service: 'Engine Diagnostics',
      rating: 4,
      image: 'assets/technicians-img/tech4.jpg'
    },
    {
      name: 'Logan Wilson',
      experience: 6,
      service: 'AC Repair',
      rating: 5,
      image: 'assets/technicians-img/tech5.jpg'
    },
    {
      name: 'Liam Johnson',
      experience: 9,
      service: 'Electrical Systems',
      rating: 4,
      image: 'assets/technicians-img/tech6.jpg'
    },
    {
      name: 'James Wilson',
      experience: 11,
      service: 'Battery Replacement',
      rating: 5,
      image: 'assets/technicians-img/tech7.jpg'
    },
    {
      name: 'Jackson Moore',
      experience: 4,
      service: 'Oil Change',
      rating: 3,
      image: 'assets/technicians-img/tech8.jpg'
    },
    {
      name: 'Robert King',
      experience: 12,
      service: 'Tire Services',
      rating: 5,
      image: 'assets/technicians-img/tech9.jpg'
    },
    {
      name: 'Grace Miller',
      experience: 7,
      service: 'Headlight Restoration',
      rating: 4,
      image: 'assets/technicians-img/tech10.jpg'
    }
  ];
}