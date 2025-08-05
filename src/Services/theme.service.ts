import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly THEME_KEY = 'admin-dashboard-theme';

  private isDarkModeSubject = new BehaviorSubject<boolean>(false);
  public isDarkMode$ = this.isDarkModeSubject.asObservable();

  constructor() {
    this.loadTheme();
  }

  private loadTheme(): void {
    const savedTheme = localStorage.getItem(this.THEME_KEY);
    const isDark = savedTheme === 'dark';
    this.isDarkModeSubject.next(isDark);
    this.applyTheme(isDark);
  }

  public toggleTheme(): void {
    const currentTheme = this.isDarkModeSubject.value;
    const newTheme = !currentTheme;
    this.isDarkModeSubject.next(newTheme);
    this.applyTheme(newTheme);
    this.saveTheme(newTheme);
  }

  private applyTheme(isDark: boolean): void {
    const body = document.body;
    if (isDark) {
      body.classList.add('dark-theme');
      body.classList.remove('light-theme');
    } else {
      body.classList.add('light-theme');
      body.classList.remove('dark-theme');
    }
  }

  private saveTheme(isDark: boolean): void {
    localStorage.setItem(this.THEME_KEY, isDark ? 'dark' : 'light');
  }

  public get isDarkMode(): boolean {
    return this.isDarkModeSubject.value;
  }
}
