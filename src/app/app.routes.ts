import { Routes } from '@angular/router';
import { HomeComponent } from '../Components/Landing/home/home.component';
import { LoginComponent } from '../Components/Landing/login/login.component';
import { RegisterComponent } from '../Components/Landing/register/register.component';
import { AboutComponent } from '../Components/Landing/about/about.component';
import { FeedbackComponent } from '../Components/Landing/feedback/feedback.component';
import { ServicesComponent } from '../Components/Landing/services/services.component';
import { TechniciansComponent as LandingTechniciansComponent } from '../Components/Landing/technicians/technicians.component';
import { DashboardComponent as AdminDashboardComponent } from '../Components/Admin/dashboard/dashboard.component';
import { DashboardHomeComponent } from '../Components/Admin/dashboard-home/dashboard-home.component';
import { DashboardComponent as CustomerDashboardComponent } from '../Components/Customer/dashboard/dashboard.component';
import { VehiclesComponent } from '../Components/Customer/vehicles/vehicles.component';
import { ServiceHistoryComponent } from '../Components/Customer/service-history/service-history.component';
import { CustomersComponent } from '../Components/Admin/customers/customers.component';
import { DriversComponent } from '../Components/Admin/drivers/drivers.component';
import { TechniciansComponent } from '../Components/Admin/technicians/technicians.component';
import { OrdersComponent } from '../Components/Admin/orders/orders.component';
import { StockComponent } from '../Components/Admin/stock/stock.component';
import { FinancialComponent } from '../Components/Admin/financial/financial.component';
import { TechnicianEarningsComponent } from '../Components/TechniciansDashboard/earnings/earnings.component';
import { TechniciansDashboardComponent } from '../Components/TechniciansDashboard/dashboard/dashboard.component';
import { JobsComponent } from '../Components/TechniciansDashboard/jobs/jobs.component';

export const routes: Routes = [
  // Main website routes
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signUp', component: RegisterComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: FeedbackComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'technicians', component: LandingTechniciansComponent },
  { path: 'technician/dashboard', component: TechniciansDashboardComponent },
 {path:'jobs',component:JobsComponent},

  {path:'technicianearnings',component:TechnicianEarningsComponent},
  

  // Customer Dashboard (Dashboard Demo - like before)
  { path: 'dashboard', component: CustomerDashboardComponent },
  { path: 'vehicles', component: VehiclesComponent },
  { path: 'service-history', component: ServiceHistoryComponent },

  // Professional Admin Dashboard with Child Routes
  {
    path: 'admin',
    component: AdminDashboardComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardHomeComponent },
      { path: 'customers', component: CustomersComponent },
      { path: 'drivers', component: DriversComponent },
      { path: 'technicians', component: TechniciansComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'stock', component: StockComponent },
      { path: 'financial', component: FinancialComponent },
    ],
  },

  // Fallback - redirect to home page for unknown routes
  { path: '**', redirectTo: '/home' },
];
