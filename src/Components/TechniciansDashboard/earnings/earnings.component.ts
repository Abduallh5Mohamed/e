import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
interface TechEarnings {
   id: number;
      service: string;
      client: string,
      date: Date;
      Price:number;
         status: 'Paid' | 'pending' | 'Failed';

      statusColor: string;
      description: string;
      paymentMethod: string;
 
}

interface EarningsData {
  todayEarnings: number;
  weeklyEarnings: number;
  monthlyEarnings: number;
  earned: number;
}

@Component({
  selector: 'app-earnings',
  imports: [CommonModule,FormsModule],
  templateUrl: './earnings.component.html',
  styleUrl: './earnings.component.css'
})
export class TechnicianEarningsComponent implements OnInit {
  earningsData: EarningsData = {
    todayEarnings: 245,
    weeklyEarnings: 1680,
    monthlyEarnings: 6420,
    earned: 28750
  };

  todayJobs: TechEarnings[] = [
    {
    id: 1,
      service: "Transmission Repair",
      
      client: "David Chen",
      date: new Date('2025-08-10T10:30:00'),
     Price:100,
      status: "Paid",
      statusColor: "green",
      description: "Emergency AC repair service",
      paymentMethod: "Credit Card"
    },
    {
      id: 2,
      service: "Brake Repair",
      client: "Sarah Johnson",
      date: new Date('2025-08-12T10:30:00'),
     Price:120,
      status: "pending",
      statusColor: "yellow",
      description: "Kitchen sink repair",
      paymentMethod: "Bank Transfer"},
      {
      id: 3,
      service: "Oil Change",
      client: "Mike Wilson",
      date: new Date('2025-07-18T10:30:00'),
      Price:50,
      status: "Paid",
      statusColor: "green",
      description: "Outlet installation and wiring",
      paymentMethod: "Cash"
    },
    {
      id: 4,
      service: "Electrical Services",
      client: "Emma Davis",
      date: new Date('2025-07-11T10:30:00'),
       Price:130,
      status: "Failed",
      statusColor: "red",
      description: "Living room wall painting",
      paymentMethod: "Credit Card"
    },
    {
      id: 5,
      service: "Electrical Services",
      client: "John Smith",
      date: new Date('2025-06-30T10:30:00'),
       Price:200,
      status: "Paid",
      statusColor: "green",
      description: "Deep carpet cleaning service",
      paymentMethod: "PayPal"
    }
  ];

  constructor() {}

  ngOnInit(): void {
   
  }

  viewJobDetails(jobId: string): void {
    console.log('Viewing job details for:', jobId);
    
  }
}