import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Vehicle {
  id: number;
  name: string;
  year: number;
  color: string;
  plateNumber: string;
  currentMileage: string;
  nextServiceDue: string;
  image: string;
}

@Component({
  selector: 'app-vehicles',
  imports: [CommonModule],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.css',
})
export class VehiclesComponent {
  vehicles: Vehicle[] = [
    {
      id: 1,
      name: 'Toyota Camry',
      year: 2020,
      color: 'Red',
      plateNumber: 'ABC-123',
      currentMileage: '45,000',
      nextServiceDue: 'Oil Change (500 miles)',
      image: './assets/vehicles-img/toyota_camry2.jpeg',
    },
    {
      id: 2,
      name: 'Honda CR-V',
      year: 2019,
      color: 'Black',
      plateNumber: 'XYZ-789',
      currentMileage: '38,000',
      nextServiceDue: 'Oil Change (500 miles)',
      image: './assets/vehicles-img/honda_cr_v.jpeg',
    },
    {
      id: 3,
      name: 'Jeep Renegade',
      year: 2019,
      color: 'Blue',
      plateNumber: 'FGH-652',
      currentMileage: '41,200',
      nextServiceDue: 'Battery Check (800 miles)',
      image: './assets/vehicles-img/2019_jeep_regenda.jpeg',
    },
  ];

  // TrackBy function for performance optimization
  trackByVehicleId(index: number, vehicle: Vehicle): number {
    return vehicle.id;
  }
}
