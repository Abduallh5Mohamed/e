import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class ServicesComponent implements OnInit {
  services = [
    {
      icon: './assets/services-img/brake-disc.png',
      title: 'Brake Repair',
      description:
        'Our brake repair services include inspection, diagnosis, and repair of brake components to ensure safe and reliable braking performance.',
    },
    {
      icon: './assets/services-img/gear-box.png',
      title: 'Transmission Repair',
      description:
        'Our transmission services include fluid and filter replacement, an inspection of transmission components, and repair or replacement as needed.',
    },
    {
      icon: './assets/services-img/damper.png',
      title: 'Suspension Repair',
      description:
        'Our suspension repair services include inspection and repair of worn components, such as shocks and struts, to improve handling and ride comfort.',
    },
    {
      icon: './assets/services-img/engine-oil.png',
      title: 'Oil Change',
      description:
        'Regular oil changes are essential to keep your engine running smoothly. Our oil change services include the replacement of old oil and oil filters with new, high-quality products.',
    },
    {
      icon: './assets/services-img/technician.png',
      title: 'Electrical Services',
      description:
        'Our electrical system repair services include diagnosis and repair of electrical issues, such as battery replacement, alternator replacement, and wiring repairs.',
    },
    {
      icon: './assets/services-img/tires.png',
      title: 'Tire Services',
      description:
        'Our tire services include tire rotation, balancing, and replacement, as well as alignment services to improve handling and prolong tire life.',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
