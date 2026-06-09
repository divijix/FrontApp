import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  themeSignal = signal<'light' | 'dark'>('dark');

  constructor() {
    // Determine initial theme on instantiation
    const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const initialTheme = storedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    this.themeSignal.set(initialTheme);

    // Dynamic document root updates based on signal changes
    effect(() => {
      const current = this.themeSignal();
      const root = document.documentElement;
      if (current === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
      localStorage.setItem('theme', current);
    });
  }

  toggleTheme() {
    this.themeSignal.update(val => val === 'dark' ? 'light' : 'dark');
  }

  isDark(): boolean {
    return this.themeSignal() === 'dark';
  }
}
