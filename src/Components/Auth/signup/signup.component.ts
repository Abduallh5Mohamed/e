import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService, AuthError } from '../../../Services/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  signupForm: FormGroup;
  loading = false;
  error: string | null = null;
  showPassword = false;
  showConfirmPassword = false;
  
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      displayName: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-Z\s]+$/)
      ]],
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
      ]],
      confirmPassword: ['', [Validators.required]],
      acceptTerms: [false, [Validators.requiredTrue]]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    // Subscribe to auth loading state
    this.authService.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe(loading => this.loading = loading);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Custom validator for password matching
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    
    if (confirmPassword?.hasError('passwordMismatch')) {
      delete confirmPassword.errors!['passwordMismatch'];
      if (Object.keys(confirmPassword.errors!).length === 0) {
        confirmPassword.setErrors(null);
      }
    }
    
    return null;
  }

  // Get form control for easy access in template
  get f() {
    return this.signupForm.controls;
  }

  // Check if field has error
  hasError(fieldName: string, errorType?: string): boolean {
    const field = this.signupForm.get(fieldName);
    if (errorType) {
      return !!(field?.hasError(errorType) && (field?.dirty || field?.touched));
    }
    return !!(field?.invalid && (field?.dirty || field?.touched));
  }

  // Get error message for field
  getErrorMessage(fieldName: string): string {
    const field = this.signupForm.get(fieldName);
    if (!field || !field.errors || (!field.dirty && !field.touched)) {
      return '';
    }

    const errors = field.errors;
    
    switch (fieldName) {
      case 'displayName':
        if (errors['required']) return 'Display name is required';
        if (errors['minlength']) return 'Display name must be at least 3 characters';
        if (errors['maxlength']) return 'Display name cannot exceed 50 characters';
        if (errors['pattern']) return 'Display name can only contain letters and spaces';
        break;
        
      case 'email':
        if (errors['required']) return 'Email is required';
        if (errors['email'] || errors['pattern']) return 'Please enter a valid email address';
        break;
        
      case 'password':
        if (errors['required']) return 'Password is required';
        if (errors['minlength']) return 'Password must be at least 6 characters';
        if (errors['pattern']) return 'Password must contain uppercase, lowercase, and number';
        break;
        
      case 'confirmPassword':
        if (errors['required']) return 'Please confirm your password';
        if (errors['passwordMismatch']) return 'Passwords do not match';
        break;
        
      case 'acceptTerms':
        if (errors['required']) return 'You must accept the terms and conditions';
        break;
    }
    
    return 'Invalid input';
  }

  // Toggle password visibility
  togglePasswordVisibility(field: 'password' | 'confirmPassword'): void {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  // Handle form submission
  async onSubmit(): Promise<void> {
    if (this.signupForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.error = null;
    
    try {
      const { displayName, email, password } = this.signupForm.value;
      await this.authService.signUp(email, password, displayName);
      
      // Redirect to email verification page
      this.router.navigate(['/verify-email']);
      
    } catch (error: any) {
      this.error = error.message || 'An error occurred during sign up';
    }
  }

  // Handle Google Sign Up
  async signUpWithGoogle(): Promise<void> {
    this.error = null;
    
    try {
      await this.authService.signInWithGoogle();
      this.router.navigate(['/dashboard']);
    } catch (error: any) {
      this.error = error.message || 'An error occurred with Google sign up';
    }
  }

  // Handle Facebook Sign Up
  async signUpWithFacebook(): Promise<void> {
    this.error = null;
    
    try {
      await this.authService.signInWithFacebook();
      this.router.navigate(['/dashboard']);
    } catch (error: any) {
      this.error = error.message || 'An error occurred with Facebook sign up';
    }
  }

  // Mark all form fields as touched to show validation errors
  private markFormGroupTouched(): void {
    Object.keys(this.signupForm.controls).forEach(key => {
      const control = this.signupForm.get(key);
      control?.markAsTouched();
    });
  }

  // Clear error message
  clearError(): void {
    this.error = null;
  }
}