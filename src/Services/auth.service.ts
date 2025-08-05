import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User, updateProfile, sendEmailVerification, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, onAuthStateChanged, reload } from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc, updateDoc, serverTimestamp } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, from, throwError } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface UserData {
  uid: string;
  email: string;
  displayName: string;
  role: 'user' | 'admin' | 'technician';
  createdAt: any;
  lastLoginAt: any;
  emailVerified: boolean;
  photoURL?: string | null;
  provider?: string;
}

export interface AuthError {
  code: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<UserData | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  private loadingSubject = new BehaviorSubject<boolean>(true);
  public loading$ = this.loadingSubject.asObservable();

  private emailVerificationCheckInterval: any;

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private router: Router
  ) {
    this.initializeAuthState();
  }

  private initializeAuthState(): void {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        const userData = await this.getUserData(user.uid);
        if (userData) {
          this.currentUserSubject.next(userData);
        } else {
          // Create user data if it doesn't exist (for social login)
          const newUserData: UserData = {
            uid: user.uid,
            email: user.email || '',
            displayName: user.displayName || 'User',
            role: 'user',
            createdAt: serverTimestamp(),
            lastLoginAt: serverTimestamp(),
            emailVerified: user.emailVerified,
            photoURL: user.photoURL || null,
            provider: user.providerData[0]?.providerId || 'email'
          };
          await this.saveUserData(newUserData);
          this.currentUserSubject.next(newUserData);
        }
      } else {
        this.currentUserSubject.next(null);
      }
      this.loadingSubject.next(false);
    });
  }

  // Sign Up with Email and Password
  async signUp(email: string, password: string, displayName: string): Promise<void> {
    try {
      this.loadingSubject.next(true);
      
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;

      // Update profile with display name
      await updateProfile(user, { displayName });

      // Send email verification
      await sendEmailVerification(user);

      // Save user data to Firestore
      const userData: UserData = {
        uid: user.uid,
        email: user.email || '',
        displayName,
        role: 'user',
        createdAt: serverTimestamp(),
        lastLoginAt: serverTimestamp(),
        emailVerified: false,
        provider: 'email'
      };

      await this.saveUserData(userData);
      this.currentUserSubject.next(userData);

    } catch (error: any) {
      throw this.handleAuthError(error);
    } finally {
      this.loadingSubject.next(false);
    }
  }

  // Sign In with Email and Password
  async signIn(email: string, password: string): Promise<void> {
    try {
      this.loadingSubject.next(true);
      
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;

      // Update last login time
      await this.updateLastLogin(user.uid);

      const userData = await this.getUserData(user.uid);
      if (userData) {
        userData.lastLoginAt = serverTimestamp();
        userData.emailVerified = user.emailVerified;
        this.currentUserSubject.next(userData);
      }

    } catch (error: any) {
      throw this.handleAuthError(error);
    } finally {
      this.loadingSubject.next(false);
    }
  }

  // Google Sign In
  async signInWithGoogle(): Promise<void> {
    try {
      this.loadingSubject.next(true);
      
      const provider = new GoogleAuthProvider();
      provider.addScope('email');
      provider.addScope('profile');

      const userCredential = await signInWithPopup(this.auth, provider);
      const user = userCredential.user;

      // Check if user data exists, if not create it
      let userData = await this.getUserData(user.uid);
      if (!userData) {
        userData = {
          uid: user.uid,
          email: user.email || '',
          displayName: user.displayName || 'User',
          role: 'user',
          createdAt: serverTimestamp(),
          lastLoginAt: serverTimestamp(),
          emailVerified: user.emailVerified,
          photoURL: user.photoURL || null,
          provider: 'google'
        };
        await this.saveUserData(userData);
      } else {
        await this.updateLastLogin(user.uid);
        userData.lastLoginAt = serverTimestamp();
        userData.emailVerified = user.emailVerified;
      }

      this.currentUserSubject.next(userData);

    } catch (error: any) {
      throw this.handleAuthError(error);
    } finally {
      this.loadingSubject.next(false);
    }
  }

  // Facebook Sign In
  async signInWithFacebook(): Promise<void> {
    try {
      this.loadingSubject.next(true);
      
      const provider = new FacebookAuthProvider();
      provider.addScope('email');

      const userCredential = await signInWithPopup(this.auth, provider);
      const user = userCredential.user;

      // Check if user data exists, if not create it
      let userData = await this.getUserData(user.uid);
      if (!userData) {
        userData = {
          uid: user.uid,
          email: user.email || '',
          displayName: user.displayName || 'User',
          role: 'user',
          createdAt: serverTimestamp(),
          lastLoginAt: serverTimestamp(),
          emailVerified: user.emailVerified,
          photoURL: user.photoURL || null,
          provider: 'facebook'
        };
        await this.saveUserData(userData);
      } else {
        await this.updateLastLogin(user.uid);
        userData.lastLoginAt = serverTimestamp();
        userData.emailVerified = user.emailVerified;
      }

      this.currentUserSubject.next(userData);

    } catch (error: any) {
      throw this.handleAuthError(error);
    } finally {
      this.loadingSubject.next(false);
    }
  }

  // Send Email Verification
  async sendEmailVerification(): Promise<void> {
    const user = this.auth.currentUser;
    if (user && !user.emailVerified) {
      try {
        await sendEmailVerification(user);
      } catch (error: any) {
        throw this.handleAuthError(error);
      }
    }
  }

  // Check Email Verification Status
  async checkEmailVerification(): Promise<boolean> {
    const user = this.auth.currentUser;
    if (user) {
      await reload(user);
      const isVerified = user.emailVerified;
      
      if (isVerified) {
        // Update user data in Firestore
        await updateDoc(doc(this.firestore, 'users', user.uid), {
          emailVerified: true
        });
        
        // Update current user subject
        const currentUser = this.currentUserSubject.value;
        if (currentUser) {
          currentUser.emailVerified = true;
          this.currentUserSubject.next(currentUser);
        }
      }
      
      return isVerified;
    }
    return false;
  }

  // Start Email Verification Check
  startEmailVerificationCheck(): void {
    this.emailVerificationCheckInterval = setInterval(async () => {
      const isVerified = await this.checkEmailVerification();
      if (isVerified) {
        this.stopEmailVerificationCheck();
        this.router.navigate(['/dashboard']);
      }
    }, 3000);
  }

  // Stop Email Verification Check
  stopEmailVerificationCheck(): void {
    if (this.emailVerificationCheckInterval) {
      clearInterval(this.emailVerificationCheckInterval);
      this.emailVerificationCheckInterval = null;
    }
  }

  // Sign Out
  async signOut(): Promise<void> {
    try {
      this.stopEmailVerificationCheck();
      await signOut(this.auth);
      this.currentUserSubject.next(null);
      this.router.navigate(['/login']);
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  // Reset Password
  async resetPassword(email: string): Promise<void> {
    try {
      const { sendPasswordResetEmail } = await import('@angular/fire/auth');
      await sendPasswordResetEmail(this.auth, email);
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  // Get User Data from Firestore
  private async getUserData(uid: string): Promise<UserData | null> {
    try {
      const userDoc = await getDoc(doc(this.firestore, 'users', uid));
      return userDoc.exists() ? userDoc.data() as UserData : null;
    } catch (error) {
      console.error('Error getting user data:', error);
      return null;
    }
  }

  // Save User Data to Firestore
  private async saveUserData(userData: UserData): Promise<void> {
    try {
      await setDoc(doc(this.firestore, 'users', userData.uid), userData);
    } catch (error) {
      console.error('Error saving user data:', error);
      throw error;
    }
  }

  // Update Last Login Time
  private async updateLastLogin(uid: string): Promise<void> {
    try {
      await updateDoc(doc(this.firestore, 'users', uid), {
        lastLoginAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating last login:', error);
    }
  }

  // Handle Authentication Errors
  private handleAuthError(error: any): AuthError {
    let message = 'An unexpected error occurred. Please try again.';
    
    switch (error.code) {
      case 'auth/user-not-found':
        message = 'No account found with this email address.';
        break;
      case 'auth/wrong-password':
        message = 'Incorrect password. Please try again.';
        break;
      case 'auth/email-already-in-use':
        message = 'An account with this email already exists.';
        break;
      case 'auth/weak-password':
        message = 'Password should be at least 6 characters long.';
        break;
      case 'auth/invalid-email':
        message = 'Please enter a valid email address.';
        break;
      case 'auth/user-disabled':
        message = 'This account has been disabled. Please contact support.';
        break;
      case 'auth/too-many-requests':
        message = 'Too many failed attempts. Please try again later.';
        break;
      case 'auth/network-request-failed':
        message = 'Network error. Please check your connection and try again.';
        break;
      case 'auth/popup-closed-by-user':
        message = 'Sign-in was cancelled. Please try again.';
        break;
      case 'auth/cancelled-popup-request':
        message = 'Only one popup request is allowed at a time.';
        break;
    }

    return {
      code: error.code || 'unknown',
      message
    };
  }

  // Utility Methods
  get isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  get isEmailVerified(): boolean {
    const user = this.currentUserSubject.value;
    return user ? user.emailVerified : false;
  }

  get currentUser(): UserData | null {
    return this.currentUserSubject.value;
  }

  get isAdmin(): boolean {
    const user = this.currentUserSubject.value;
    return user ? user.role === 'admin' : false;
  }

  get isTechnician(): boolean {
    const user = this.currentUserSubject.value;
    return user ? user.role === 'technician' : false;
  }
}