import { Routes } from '@angular/router';
import { HomeComponent } from '../Components/Landing/home/home.component';
import { LoginComponent } from '../Components/Auth/login/login.component';
import { SignupComponent } from '../Components/Auth/signup/signup.component';
import { VerifyEmailComponent } from '../Components/Auth/verify-email/verify-email.component';
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
import { AuthGuard, AdminGuard, TechnicianGuard, GuestGuard } from '../Services/auth-guard.service';

export const routes: Routes = [
  // Main website routes
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  
  // Authentication routes (only accessible when not logged in)
  { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [GuestGuard] },
  { path: 'signUp', redirectTo: '/signup', pathMatch: 'full' }, // Redirect old route
  { path: 'verify-email', component: VerifyEmailComponent },
  
  // Public routes
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: FeedbackComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'technicians', component: LandingTechniciansComponent },
  
  // Technician routes (protected)
  { 
    path: 'technician/dashboard', 
    component: TechniciansDashboardComponent, 
    canActivate: [TechnicianGuard] 
  },
  { 
    path: 'jobs', 
    component: JobsComponent, 
    canActivate: [TechnicianGuard] 
  },
  { 
    path: 'technicianearnings', 
    component: TechnicianEarningsComponent, 
    canActivate: [TechnicianGuard] 
  },

  // Customer Dashboard (protected)
  { path: 'dashboard', component: CustomerDashboardComponent, canActivate: [AuthGuard] },
  { path: 'vehicles', component: VehiclesComponent, canActivate: [AuthGuard] },
  { path: 'service-history', component: ServiceHistoryComponent, canActivate: [AuthGuard] },

  // Professional Admin Dashboard with Child Routes (protected)
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AdminGuard],
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
