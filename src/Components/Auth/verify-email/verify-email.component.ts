import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';
import { Subject, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit, OnDestroy {
  userEmail: string = '';
  loading = false;
  error: string | null = null;
  resendCooldown = 0;
  checkingVerification = false;
  
  private destroy$ = new Subject<void>();
  private verificationCheckInterval: any;
  private resendCooldownInterval: any;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get current user email
    this.authService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        if (user) {
          this.userEmail = user.email;
          
          // If already verified, redirect to dashboard
          if (user.emailVerified) {
            this.router.navigate(['/dashboard']);
            return;
          }
          
          // Start checking verification status
          this.startVerificationCheck();
        } else {
          // If no user, redirect to login
          this.router.navigate(['/login']);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.stopVerificationCheck();
    this.stopResendCooldown();
  }

  // Start automatic verification checking
  private startVerificationCheck(): void {
    this.checkingVerification = true;
    
    this.verificationCheckInterval = setInterval(async () => {
      try {
        const isVerified = await this.authService.checkEmailVerification();
        if (isVerified) {
          this.checkingVerification = false;
          this.stopVerificationCheck();
          
          // Show success message briefly before redirect
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 1000);
        }
      } catch (error) {
        console.error('Error checking verification:', error);
      }
    }, 3000); // Check every 3 seconds
  }

  // Stop verification checking
  private stopVerificationCheck(): void {
    if (this.verificationCheckInterval) {
      clearInterval(this.verificationCheckInterval);
      this.verificationCheckInterval = null;
    }
  }

  // Resend verification email
  async resendVerificationEmail(): Promise<void> {
    if (this.resendCooldown > 0 || this.loading) {
      return;
    }

    this.loading = true;
    this.error = null;

    try {
      await this.authService.sendEmailVerification();
      
      // Start cooldown timer (60 seconds)
      this.resendCooldown = 60;
      this.startResendCooldown();
      
      // Show success message
      this.showSuccessMessage();
      
    } catch (error: any) {
      this.error = error.message || 'Failed to send verification email';
    } finally {
      this.loading = false;
    }
  }

  // Start resend cooldown timer
  private startResendCooldown(): void {
    this.resendCooldownInterval = setInterval(() => {
      this.resendCooldown--;
      if (this.resendCooldown <= 0) {
        this.stopResendCooldown();
      }
    }, 1000);
  }

  // Stop resend cooldown timer
  private stopResendCooldown(): void {
    if (this.resendCooldownInterval) {
      clearInterval(this.resendCooldownInterval);
      this.resendCooldownInterval = null;
    }
  }

  // Show success message (you might want to use a toast service instead)
  private showSuccessMessage(): void {
    // Simple success indication - in a real app, use a toast service
    const successElement = document.querySelector('.success-message');
    if (successElement) {
      successElement.classList.add('show');
      setTimeout(() => {
        successElement.classList.remove('show');
      }, 3000);
    }
  }

  // Manual verification check
  async checkVerificationNow(): Promise<void> {
    this.loading = true;
    this.error = null;

    try {
      const isVerified = await this.authService.checkEmailVerification();
      if (isVerified) {
        this.router.navigate(['/dashboard']);
      } else {
        this.error = 'Email is not verified yet. Please check your inbox and click the verification link.';
      }
    } catch (error: any) {
      this.error = error.message || 'Failed to check verification status';
    } finally {
      this.loading = false;
    }
  }

  // Sign out and go back to login
  async signOut(): Promise<void> {
    try {
      await this.authService.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }

  // Clear error message
  clearError(): void {
    this.error = null;
  }

  // Get masked email for display
  get maskedEmail(): string {
    if (!this.userEmail) return '';
    
    const [localPart, domain] = this.userEmail.split('@');
    if (localPart.length <= 2) return this.userEmail;
    
    const maskedLocal = localPart[0] + '*'.repeat(localPart.length - 2) + localPart[localPart.length - 1];
    return `${maskedLocal}@${domain}`;
  }
}