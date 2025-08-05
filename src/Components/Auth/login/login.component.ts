import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  loading = false;
  error: string | null = null;
  showPassword = false;
  returnUrl: string = '/dashboard';
  
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]],
      rememberMe: [false]
    });
  }

  ngOnInit(): void {
    // Get return URL from route parameters or default to '/dashboard'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
    
    // Subscribe to auth loading state
    this.authService.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe(loading => this.loading = loading);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Get form control for easy access in template
  get f() {
    return this.loginForm.controls;
  }

  // Check if field has error
  hasError(fieldName: string, errorType?: string): boolean {
    const field = this.loginForm.get(fieldName);
    if (errorType) {
      return !!(field?.hasError(errorType) && (field?.dirty || field?.touched));
    }
    return !!(field?.invalid && (field?.dirty || field?.touched));
  }

  // Get error message for field
  getErrorMessage(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if (!field || !field.errors || (!field.dirty && !field.touched)) {
      return '';
    }

    const errors = field.errors;
    
    switch (fieldName) {
      case 'email':
        if (errors['required']) return 'Email is required';
        if (errors['email'] || errors['pattern']) return 'Please enter a valid email address';
        break;
        
      case 'password':
        if (errors['required']) return 'Password is required';
        if (errors['minlength']) return 'Password must be at least 6 characters';
        break;
    }
    
    return 'Invalid input';
  }

  // Toggle password visibility
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  // Handle form submission
  async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.error = null;
    
    try {
      const { email, password } = this.loginForm.value;
      await this.authService.signIn(email, password);
      
      // Check if email is verified
      if (this.authService.isEmailVerified) {
        this.router.navigate([this.returnUrl]);
      } else {
        this.router.navigate(['/verify-email']);
      }
      
    } catch (error: any) {
      this.error = error.message || 'An error occurred during sign in';
    }
  }

  // Handle Google Sign In
  async signInWithGoogle(): Promise<void> {
    this.error = null;
    
    try {
      await this.authService.signInWithGoogle();
      this.router.navigate([this.returnUrl]);
    } catch (error: any) {
      this.error = error.message || 'An error occurred with Google sign in';
    }
  }

  // Handle Facebook Sign In
  async signInWithFacebook(): Promise<void> {
    this.error = null;
    
    try {
      await this.authService.signInWithFacebook();
      this.router.navigate([this.returnUrl]);
    } catch (error: any) {
      this.error = error.message || 'An error occurred with Facebook sign in';
    }
  }

  // Handle forgot password
  async onForgotPassword(): Promise<void> {
    const email = this.loginForm.get('email')?.value;
    
    if (!email) {
      this.error = 'Please enter your email address first';
      return;
    }

    try {
      await this.authService.resetPassword(email);
      this.error = null;
      // Show success message (you might want to use a toast service instead)
      alert('Password reset email sent! Please check your inbox.');
    } catch (error: any) {
      this.error = error.message || 'An error occurred while sending reset email';
    }
  }

  // Mark all form fields as touched to show validation errors
  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  // Clear error message
  clearError(): void {
    this.error = null;
  }
}